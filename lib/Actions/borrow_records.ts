'use server'

import { sql } from "@vercel/postgres";
import { Asset, BorrowItem, BorrowRecord, State } from "../interface";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";


export async function getAllBorrowRecords() {

    const data = await sql<BorrowRecord & BorrowItem>`SELECT br.*, JSON_AGG(
            JSON_BUILD_OBJECT(
                'borrow_item_id', bi.borrow_item_id,
                'asset_id', ass.asset_id,
                'asset_name', ass.asset_name
            )
        ) as borrowed_items FROM borrow_records br
    left join borrow_items bi on br.borrow_id = bi.borrow_id
    left join assets ass on bi.asset_id = ass.asset_id
    group by br.borrow_id order by br.borrow_status DESC, br.borrow_date DESC `;

    return data.rows
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
        borrow_status: 'open',
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
            agreement,
            borrow_status
            )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [
                borrowRecordBody.borrow_id, 
                borrowRecordBody.borrower_name, 
                borrowRecordBody.borrow_date, 
                borrowRecordBody.return_date,
                borrowRecordBody.borrower_id,
                borrowRecordBody.contact_no,
                borrowRecordBody.description,
                borrowRecordBody.agreement,
                borrowRecordBody.borrow_status
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

            //update asset items to borrowed
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
            code: 201,
            status: true,
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

export async function returnBorrowedItem(borrow_record:any) {
    const client = await sql.connect();
    

    try {
        await client.query('BEGIN')

        await client.query(`UPDATE borrow_records SET borrow_status = 'completed' WHERE borrow_id = $1`, [borrow_record.borrow_id])

        
        if(borrow_record.borrowed_items.length > 0) {
            const borrowed_items = borrow_record.borrowed_items

            //update borrow item status
            const updateBorrowItemQuery = `UPDATE borrow_items SET item_status = 'returned' WHERE borrow_item_id IN (${borrowed_items.map((item:any, idx:number) => `$${idx * 1 + 1}`)})`

            const dataBorrowedItemBody = borrowed_items.flatMap((item:any) => [
                item.borrow_item_id,
            ])

            

            //update borrowed assets to available
            const updateAssetQuery = `UPDATE assets SET asset_status = 'available' WHERE asset_id IN (${borrowed_items.map((item:any, idx:number) => `$${idx * 1 + 1}`)})`

            const dataAssetBody = borrowed_items.flatMap((item:any) => [
                item.asset_id,
            ])

            await client.query(updateBorrowItemQuery, dataBorrowedItemBody)

            await client.query(updateAssetQuery, dataAssetBody)

        }

        await client.query('COMMIT');
        revalidatePath("/borrowers-list");
        revalidatePath("/");

        return {
            code: 201,
            status: true,
            message: 'Thank you for returning the item(s)'
        }
    } catch (error) {
        console.error('Error', error);
        await client.query('ROLLBACK');
        return {
            message: 'Something went wrong'
        }
    }finally {
        client.release();  // Ensure connection is released after each use
    }
}