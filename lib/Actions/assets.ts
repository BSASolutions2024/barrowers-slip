'use server'

import { sql } from "@vercel/postgres";
import { Asset, State } from "../interface";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function getAllAssets() {

    const data = await sql<Asset>`SELECT * FROM assets `;

    return data.rows
}

export async function createAsset(prevState: State, formData: FormData,) {
    const uuid = randomUUID()
    const body = {
        asset_id: uuid,
        asset_name: formData.get('asset_name'),
        asset_status: 'available',
    } as Asset

    try {
        await sql`INSERT INTO assets (asset_id, asset_name, asset_status)
        VALUES (${body.asset_id}, ${body.asset_name}, ${body.asset_status})`

        revalidatePath("/borrowers-list");
    } catch (error) {
        return {
            message: 'Something went wrong'
        }
    }

    return redirect('/borrowers-list')
}