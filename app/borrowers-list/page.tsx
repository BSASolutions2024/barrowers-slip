
import { getBorrowersList } from "@/lib/borrow";
import BorrowersRow from "../components/BorrowersRow";
import AssetsCard from "../components/AssetsCard";
import { getAllBorrowRecords } from "@/lib/Actions/borrow_records";
import { BorrowRecord } from "@/lib/interface";


export default async function BorrowersList(){
    const list = await getAllBorrowRecords()

    async function returnBorrowed() {
        const body = {
            returned: 1
        }
    }


    return (
        <div className="container gap-8 flex flex-row m-auto my-20 items-start">
            <div className="flex">
                <AssetsCard></AssetsCard>
            </div>
            <div className="flex">
                <div className="card bg-base-100 shadow-md">
                    <div className="card-body">
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Borrower's Name</th>
                                    <th>Item Borrowed</th>
                                    <th>Decscription</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                { list.map((i:BorrowRecord) => <BorrowersRow item={i} key={i.borrow_id} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}