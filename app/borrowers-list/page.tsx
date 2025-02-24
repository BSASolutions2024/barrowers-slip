import BorrowersCard from "../components/borrow-records/BorrowersCard";
import AssetsCard from "../components/asset/AssetsCard";
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
    redirect("/login");
  }
}

export default async function BorrowersList() {
  const user = await getUserProp();

  return (
    <div className="container mx-auto py-8">
      <Header user={user}></Header>

      <main className="flex flex-row gap-8">
        <div className="flex-1 basis-1/3">
          <AssetsCard></AssetsCard>
        </div>
        <div className="flex-1 basis-2/3">
          <BorrowersCard></BorrowersCard>
        </div>
      </main>
    </div>
  );
}
