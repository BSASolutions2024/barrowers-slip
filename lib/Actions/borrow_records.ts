import { sql } from "@vercel/postgres";
import { Asset } from "../interface";

export default async function getAllBorrowRecords() {

    const data = await sql<Asset>`SELECT * FROM borrow_records `;

    return data.rows
}