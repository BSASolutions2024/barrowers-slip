import { sql } from "@vercel/postgres";
import { BorrowItem } from "../interface";

export async function getBorrowItemsByBorrowRecordId(id:string) {
    const client = await sql.connect();

    const data = await client.query<BorrowItem>(`SELECT * FROM borrow_items where borrow_id = $::text `, [id])

    return data.rows
}