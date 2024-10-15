// no-config
import { sql } from '@vercel/postgres';

export default async function TestQuery() {

    const { rows } = await sql`SELECT * FROM property_borrowed_list `;

    return rows
}
