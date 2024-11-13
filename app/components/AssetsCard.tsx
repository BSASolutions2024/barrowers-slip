
import BToast from "@/components/ui/bsa_toast/Btoast"
import { getAllAssets } from "@/lib/Actions/assets"
import { Asset, State } from "@/lib/interface"
import { useActionState, useState } from "react"
import AssetForm from "./AssetForm"

export const revalidate = 2;

export default async function AssetsCard() {
    const list:Asset[] = await getAllAssets()

    return (
        <div className="card bg-base-100 bordered">
            <div className="card-body">
                <div className="flex flex-row w-full justify-between">
                    <h2 className="card-title">Assets</h2>
                    <AssetForm ></AssetForm>
                </div>
                <table className="table ">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { list.map((i:Asset) => (
                        <tr key={i.asset_id}>
                            <td>{i.asset_name}</td>
                            <td>{i.asset_type}</td>
                            <td className="flex">
                                <span className={`${i.asset_status !== 'available' ? 'badge-warning' : 'badge-success'} badge p-3`}>
                                    {i.asset_status}
                                </span>
                            </td>
                            <td>
                                
                            </td>
                        </tr>
                    ) )}
                </tbody>
            </table>
            </div>
        </div>
    )
}