import Image from "next/image";
import { getAllAssets } from "@/lib/Actions/assets";
import BorrowForm from "./components/BorrowForm";

export default async function Home() {
  const comp_properties = await getAllAssets()

  // const borrowedItems = await getBorrowed_Items()

  // const arrayofItems = borrowedItems.map((item:any) => {
  //   return item.items_borrowed.split(',').map((i:string) => i.trim());
  // }).flat()
  
  return (
    <div className="lg:w-[50%]  mx-auto mb-20 lg:px-0 px-10">
        <div className="flex flex-col justify-center">
          <Image className="mx-auto" src={'/bsa_banner.png'} alt="" height={100} width={500}/>
          <h2 className="text-center font-semibold leading-7 text-gray-900 mb-10 text-md">Company Borrower's Slip</h2>
        </div>
        <BorrowForm assets={comp_properties}></BorrowForm>
    </div>
  );
}
