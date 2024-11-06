'use client'

import returnItem from "@/lib/actions";
import { toJSONLocal } from "@/lib/helper";

export default function BorrowersRow({item, key}:{item:any, key:any}){
    const body = {
        returned: 1
    }
    return (
        <>
            <tr key={key}>
                <td>{item.borrower_id}</td>
                <td>{toJSONLocal(item.borrow_date)}</td>
                <td>{item.borrower_name}</td>
                <td>To fetch</td>
                <td>{item.description}</td>
                <td>{item.borrow_status}</td>
                <td>
                <button className="btn btn-circle" onClick={() => returnItem(item.borrower_id, body)}>
                    X
                </button>
                </td>
            </tr>
        </>
    )
}