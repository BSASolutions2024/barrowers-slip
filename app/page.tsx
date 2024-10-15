import BCheckbox from "@/components/ui/bsa_checkbox/BCheckbox";
import BDropdown from "@/components/ui/bsa_dropdown/BDropdown";
import { COMP_PROPERTIES, getBorrowed_Items } from "@/lib/borrow";
import { borrowItem } from "@/lib/actions";

import Image from "next/image";
import { toJSONLocal } from "@/lib/helper";
import TestQuery from "@/lib/postgre";

export default async function Home() {
  const comp_properties = COMP_PROPERTIES

  const borrowedItems = await getBorrowed_Items()

  const arrayofItems = borrowedItems.map((item:any) => {
    return item.items_borrowed.split(',').map((i:string) => i.trim());
  }).flat()

  return (
    <div className="w-[50%] container mx-auto">
        <div className="flex flex-col justify-center">
          <Image className="mx-auto" src={'/bsa_banner.png'} alt="" height={200} width={500}/>
          <h2 className="text-center font-semibold leading-7 text-gray-900 mb-10">Company Borrower's Slip</h2>
        </div>
      
      <form action={borrowItem}>
      <div className="space-y-12">
        
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Please complete the form</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
            <div className="flex flex-col">
              <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                Date
              </label>
              <div className="mt-2">
                <input
                  id="date"
                  name="date"
                  type="date"
                  disabled
                  value={toJSONLocal(new Date())}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="borrowers_name" className="block text-sm font-medium leading-6 text-gray-900">
                Borrower's Name
              </label>
              <div className="mt-2">
                <input
                  id="borrowers_name"
                  name="borrowers_name"
                  type="text"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="borrowers_id" className="block text-sm font-medium leading-6 text-gray-900">
                Borrower's ID
              </label>
              <div className="mt-2">
                <input
                  id="borrowers_id"
                  name="borrowers_id"
                  type="text"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                Location
              </label>
              <div className="mt-2">
                <BDropdown name="location"/>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="contact_no" className="block text-sm font-medium leading-6 text-gray-900">
                Contact #
              </label>
              <div className="mt-2">
                <input
                  id="contact_no"
                  name="contact_no"
                  type="text"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="borrowers_id" className="block text-sm font-medium leading-6 text-gray-900">
                Item(s) to borrow
              </label>
              <div className="mt-2">
                {comp_properties.map(prop => {
                  const borrowed = arrayofItems.includes(prop)
                  return <BCheckbox key={prop} label={prop} name={prop.trim().toLowerCase()} disabled={borrowed}/>
                  }  )}
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea 
                className="textarea textarea-bordered w-full" 
                placeholder="Description"
                name="description"></textarea>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="date_borrowed" className="block text-sm font-medium leading-6 text-gray-900">
                Date Borrowed
              </label>
              <div className="mt-2">
                <input
                  id="date_borrowed"
                  name="date_borrowed"
                  type="date"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="return_date" className="block text-sm font-medium leading-6 text-gray-900">
                Expected return date
              </label>
              <div className="mt-2">
                <input
                  id="return_date"
                  name="return_date"
                  type="date"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div className="flex flex-row gap-2">
              <BCheckbox name="agreement"/>
              <p>I hereby acknowledge that I have received the above-mentioned property and will use it solely for the purpose it was intended. I understand that I am fully responsible for the said property while it is under my care and that any damage, loss, or theft will be my sole responsibility.
                  I agree to return the property on or before the expected return date indicated above. I also understand that failure to return the property on the said date will be subject to penalties as may be determined by the company. </p>
              <div className="mt-2">
                
              </div>
            </div>
            

          </div>
        </div>

      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
    </div>
  );
}
