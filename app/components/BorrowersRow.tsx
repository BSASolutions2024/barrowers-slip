'use client'
import returnItem from "@/lib/actions";

export default async function BorrowersRow({item, key}:{item:any, key:number}){
    const body = {
        returned: 1
    }
    return (
        <>
            <tr key={key}>
                <td>{item.id}</td>
                <td>{item.date}</td>
                <td>{item.borrowers_name}</td>
                <td>{item.items_borrowed}</td>
                <td>{item.description}</td>
                <td>{item.returned ? 'returned' : 'unreturned'}</td>
                <td>
                <button className="btn btn-circle" onClick={() => returnItem(item.id, body)}>
                    X
                </button>
                </td>
            </tr>
        </>
    )
}