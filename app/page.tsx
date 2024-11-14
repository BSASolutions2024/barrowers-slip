import Image from "next/image";
import { getAllAssets } from "@/lib/Actions/assets";
import BorrowForm from "./components/BorrowForm";

export default async function Home() {
  const comp_properties = await getAllAssets()
  
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
