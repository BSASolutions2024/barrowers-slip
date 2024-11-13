'use client'

import BToast from "@/components/ui/bsa_toast/Btoast";
import { returnBorrowedItem } from "@/lib/Actions/borrow_records";
import { toJSONLocal } from "@/lib/helper";
import { useEffect, useState } from "react";


export default function BorrowersRow({item, key}:{item:any, key:any}){
    const [toastMessage, setToastMessage] = useState<string | null | undefined>(null);

    const handleReturnClick = async () => {
        const response = await returnBorrowedItem(item);

        setToastMessage(response.message)

        setTimeout(() => {
            setToastMessage(null)
            
        }, 4000)
    };

    return (
        <>
            <tr key={key}>
                {/* <td>{item.borrow_id}</td> */}
                <td>{toJSONLocal(item.borrow_date)}</td>
                <td>{item.borrower_name}</td>
                <td className="flex flex-col gap-2">{item.borrowed_items.map((i:any) => <span key={i.borrow_item_id}>{i.asset_name}</span>)}</td>
                <td>{item.description}</td>
                <td className="flex">
                    <span className={`${item.borrow_status === 'open' ? 'badge-secondary' : 'badge-success'} badge p-3`}>
                        {item.borrow_status}
                    </span>
                </td>
                <td>
                <form onSubmit={(e) =>{ e.preventDefault(); handleReturnClick(); }}>
                    <button className="btn btn-base" type="submit" disabled={item.borrow_status === 'open' ? false : true}>
                            {item.borrow_status != 'open' ? 'Returned' : 'Return'}
                    </button>
                    {toastMessage && <BToast message={toastMessage} />}
                </form>
                </td>
            </tr>
        </>
    )
}