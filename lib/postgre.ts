// no-config
import { sql } from '@vercel/postgres';
import { Asset, BorrowRecord } from './interface';

export default async function getAllRecords() {

    const data = await sql<Asset>`SELECT * FROM assets `;

    return data.rows
}
