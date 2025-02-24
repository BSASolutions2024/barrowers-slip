import Image from "next/image";
import { Suspense } from "react";
import BorrowForm from "./components/borrow-records/BorrowForm";

export default function Home() {

  return (
    <div className="lg:w-[50%]  mx-auto pb-20 lg:px-0 px-10 dark:text-white">
      <div className="flex flex-col justify-center">
        <Image
          className="mx-auto"
          src={"/bsa_banner.png"}
          height={100}
          width={500}
          alt="banner"
          priority={true}
        />
        <h2 className="text-center font-semibold leading-7 mb-10 text-md">
          Company Borrower's Slip
        </h2>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <BorrowForm></BorrowForm>
      </Suspense>
    </div>
  );
}
