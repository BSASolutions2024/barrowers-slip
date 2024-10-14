import { getBorrowersList } from "@/lib/borrow";
import BorrowersRow from "../components/BorrowersRow";
import returnItem from "@/lib/actions";


export default async function BorrowersList(){
    const list = await getBorrowersList()

    async function returnBorrowed() {
        console.log("test")
        const body = {
            returned: 1
        }
        // await returnItem(id, body)
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Borrower's Name</th>
                    <th>Item Borrowed</th>
                    <th>Decscription</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                { list.map((i:any) => <BorrowersRow item={i} key={i.id} />)}
            </tbody>
        </table>
    )
}