'use server'

import { sql } from "@vercel/postgres";
import { Asset, State } from "../interface";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const getAllAssets = cache(async function getAllAssets() {

    const data = await sql<Asset>`SELECT * FROM assets order by created_at desc`;

    return data.rows
})

export async function createAsset(prevState: State, formData: FormData,) {
    const uuid = randomUUID()
    const body = {
        asset_id: uuid,
        asset_name: formData.get('asset_name'),
        asset_status: 'available',
        created_at: (new Date()).toISOString()
    } as Asset

    try {
        await sql`INSERT INTO assets (asset_id, asset_name, asset_status, created_at)
        VALUES (${body.asset_id}, ${body.asset_name}, ${body.asset_status}, ${body.created_at})`

        revalidatePath("/borrowers-list");

        return {
            message: 'Asset succesfully created'
        }
    } catch (error) {
        return {
            message: 'Something went wrong'
        }
    }

}