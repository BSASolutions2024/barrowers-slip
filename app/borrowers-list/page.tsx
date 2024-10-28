import { getBorrowersList } from "@/lib/borrow";
import BorrowersRow from "../components/BorrowersRow";
import AssetsCard from "../components/AssetsCard";


export default async function BorrowersList(){
    const list = await getBorrowersList()

    async function returnBorrowed() {
        const body = {
            returned: 1
        }
    }

    return (
        <div className="container gap-8 flex flex-col m-auto my-20">
            <div className="w-60 ">
                <AssetsCard></AssetsCard>
            </div>
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
                            { list.map((i:any) => <BorrowersRow item={i} key={i.id} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}