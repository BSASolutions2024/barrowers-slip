import BorrowersRow from "../components/BorrowersRow";
import AssetsCard from "../components/AssetsCard";
import { getAllBorrowRecords } from "@/lib/Actions/borrow_records";
import { getUser } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Header from "../components/Header";

async function getUserProp() {
    try {
      let tokenCookie = cookies().get("token")?.value;
      
      if (!tokenCookie) {
        throw new Error();
      }
  
      return await getUser(tokenCookie);
    } catch (error) {
      redirect("/signup");
    }
  }
  
export default async function BorrowersList(){
    const user = await getUserProp();

    const list = await getAllBorrowRecords() as any

    return (
        <div className="container mx-auto">
            <Header user={user}></Header>
               
            
            <main className="flex flex-row gap-8">
                <div className="flex-1 basis-1/3">
                    <AssetsCard></AssetsCard>
                </div>
                <div className="flex-1 basis-2/3">
                    <div className="card bg-base-100 bordered">
                        <div className="card-body">
                            <table className="table ">
                                <thead>
                                    <tr>
                                        {/* <th>ID</th> */}
                                        <th>Date</th>
                                        <th>Borrower's Name</th>
                                        <th>Item Borrowed</th>
                                        <th>Decscription</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { list.map((i:any) => <BorrowersRow item={i} key={i.borrow_id} />)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}