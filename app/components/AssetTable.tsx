"use client"

import { Asset } from "@/lib/interface"

export default function AssetTable(list:any) {
    return (
        <table className="table ">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                { list.map((i:Asset) => (
                    <tr key={i.asset_id}>
                        <td>{i.asset_name}</td>
                        <td>{i.asset_type}</td>
                        <td>{i.asset_status}</td>
                    </tr>
                ) )}
            </tbody>
        </table>
    )
}