import { z } from "zod";

export const assetSchema = z.object({
    asset_id: z.string().optional(),
    asset_name: z.string().min(1, "Asset name is required"),
    asset_type: z.string().optional(),
    asset_status: z.enum(["available", "maintenance", "borrowed"]).default("available"),
    category_id: z.string().optional(),
    created_at: z.string().datetime().default(() => new Date().toISOString())
})

export type AssetFormValues = z.infer<typeof assetSchema>;