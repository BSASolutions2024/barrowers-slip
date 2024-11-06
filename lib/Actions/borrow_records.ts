'use server'

import { sql } from "@vercel/postgres";
import { Asset, BorrowItem, BorrowRecord, State } from "../interface";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";


export async function getAllBorrowRecords() {

    const data = await sql<BorrowRecord & BorrowItem>`SELECT * FROM borrow_records left join borrow_items on borrow_records.borrow_id = borrow_items.borrow_id
ORDER BY borrow_records.borrow_id ASC  `;

     // Transform the flat array into a nested structure
  const nestedResult = data.rows.reduce((acc:any, row:any) => {
    // Check if the borrow_id is already in the accumulator
    let record = acc.find((r:any) => r.borrow_id === row.borrow_id);

    // If it doesn't exist, create a new record entry
    if (!record) {
      record = {
        borrow_id: row.borrow_id,
        borrow_date: row.borrow_date,
        borrower_name: row.borrower_name,
        items: []
      };
      acc.push(record);
    }

    // Add each item to the items array of the current borrow record
    if (row.item_id) {  // Check if item exists in the result
      record.items.push({
        item_id: row.item_id,
        item_name: row.item_name,
        item_status: row.item_status
      });
    }

    return acc;
  }, []);

  return nestedResult;
}

export async function postBorrow(prevState:State, formData:FormData){
    const client = await sql.connect();

    const uuid = randomUUID()
    const borrowRecordBody = {
        borrow_id: uuid,
        borrower_name: formData.get('borrower_name'),
        borrow_date: (new Date()).toISOString(),
        return_date: formData.get('return_date'),
        borrower_id: formData.get('borrower_id'),
        contact_no: formData.get('contact_no'),
        description: formData.get('description'),
        agreement: formData.get('agreement'),
        created_at: (new Date()).toISOString()
    } as BorrowRecord

    const borrowItemBody = formData.getAll('assets[]') as string[]

    const borrowItemRows = borrowItemBody.map((item:string) =>  {
        const borrow_item_id = randomUUID()
        return{
            borrow_item_id,
            borrow_id : uuid,
            asset_id: item,
            item_status: 'borrowed',
            return_date: formData.get('return_date')
        }
    })

    try {
        await client.query('BEGIN')

        await client.query(`INSERT INTO borrow_records (
            borrow_id, 
            borrower_name, 
            borrow_date, 
            return_date,
            borrower_id,
            contact_no,
            description,
            agreement
            )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [
                borrowRecordBody.borrow_id, 
                borrowRecordBody.borrower_name, 
                borrowRecordBody.borrow_date, 
                borrowRecordBody.return_date,
                borrowRecordBody.borrower_id,
                borrowRecordBody.contact_no,
                borrowRecordBody.description,
                borrowRecordBody.agreement
            ]

        )

        if(borrowItemBody.length > 0) {
            const insertQuery = `INSERT INTO borrow_items (borrow_item_id, borrow_id, asset_id, item_status, return_date)
            VALUES ${borrowItemRows.map((item:any, idx:number) => `($${idx * 5 + 1}, $${idx * 5 + 2}, $${idx * 5 + 3}, $${idx * 5 + 4}, $${idx * 5 + 5})`).join(', ')}`;

            const dataItemsBody = borrowItemRows.flatMap((item:any) => [
                item.borrow_item_id,
                item.borrow_id,
                item.asset_id,
                item.item_status,
                item.return_date
            ])

            const updateAssetQuery = `UPDATE assets SET asset_status = 'borrowed' WHERE asset_id IN (${borrowItemRows.map((item:any, idx:number) => `$${idx * 1 + 1}`)})`

            const dataAssetBody = borrowItemRows.flatMap((item:any) => [
                item.asset_id,
            ])


            await client.query(insertQuery, dataItemsBody)

            await client.query(updateAssetQuery, dataAssetBody)

        }

        await client.query('COMMIT');

        
        revalidatePath("/borrowers-list");
        revalidatePath("/");
        return {
            message: 'Successfully booked'
        }
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error inserting borrow record and items:', error);
        return {
            message: 'Something went wrong'
        }
    }
}
