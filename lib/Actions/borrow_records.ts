'use server'

import { sql } from "@vercel/postgres";
import { Asset, BorrowItem, BorrowRecord, State } from "../interface";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";


export async function getAllBorrowRecords() {

    const data = await sql<Asset>`SELECT * FROM borrow_records `;

    return data.rows
}

export async function postBorrow(prevState:State, formData:FormData){
    const uuid = randomUUID()
    const borrowRecordBody = {
        id: uuid,
        borrower_name: formData.get('borrower_name'),
        borrow_date: (new Date()).toISOString(),
        return_date: formData.get('return_date'),
        borrower_id: formData.get('borrower_id'),
        contact_no: formData.get('contact_no'),
        description: formData.get('description'),
        agreement: formData.get('agreement'),
        created_at: (new Date()).toISOString()
    } as BorrowRecord

    // const borrowItemBody = {
    //     assets: formData.getAll('assets[]'),
    // } as BorrowItem

    try {
        await sql`INSERT INTO borrow_records (
            borrow_id, 
            borrower_name, 
            borrow_date, 
            return_date,
            borrower_id,
            contact_no,
            description,
            agreement
            )
        VALUES (
            ${borrowRecordBody.id}, 
            ${borrowRecordBody.borrower_name}, 
            ${borrowRecordBody.borrow_date}, 
            ${borrowRecordBody.return_date},
            ${borrowRecordBody.borrower_id},
            ${borrowRecordBody.contact_no},
            ${borrowRecordBody.description},
            ${borrowRecordBody.agreement}
            )`
        
        revalidatePath("/borrowers-list");
    } catch (error) {
        console.log(error)
    }
}
