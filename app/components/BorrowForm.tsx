"use client"

import BCheckbox from "@/components/ui/bsa_checkbox/BCheckbox"
import BDropdown from "@/components/ui/bsa_dropdown/BDropdown"
import BToast from "@/components/ui/bsa_toast/Btoast"
import { postBorrow } from "@/lib/Actions/borrow_records"
import { toJSONLocal } from "@/lib/helper"
import { Asset } from "@/lib/interface"
import { redirect } from "next/navigation"
import React from "react"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"

const initialState: any = {message: '', errors: {}}

export default function BorrowForm({assets}: {assets:Asset[]}) {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [state, formAction] = useFormState(postBorrow, initialState) 
    const formRef = React.useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
        borrower_name: '',
        borrower_id: '',
        location: '',
        contact_no: '',
        description: '',
        date_borrowed: '',
        return_date: ''
    })

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
    useEffect(() => {
        if (state?.message) {
            setToastMessage(state.message);

            setTimeout(() => {
                setToastMessage(null)
            }, 4000)

            if (formRef.current && state.status) {
                formRef.current.reset();
                setFormData({
                    borrower_name: '',
                    borrower_id: '',
                    location: '',
                    contact_no: '',
                    description: '',
                    date_borrowed: '',
                    return_date: ''
                })
            }
        }
    }, [state]);

    return (
        <form ref={formRef} action={formAction}>
        <div className="space-y-12">
            
            <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Please complete the form</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
                <div className="flex flex-col">
                <label htmlFor="borrow_date" className="block text-sm font-medium leading-6 text-gray-900">
                    Date
                </label>
                <div className="mt-2">
                    <input
                    id="date"
                    name="borrow_date"
                    type="date"
                    disabled
                    value={toJSONLocal(new Date())}
                    className="input input-bordered w-full"
                    />
                </div>
                </div>

                <div className="flex flex-col">
                <label htmlFor="borrower_name" className="block text-sm font-medium leading-6 text-gray-900">
                    Borrower's Name
                </label>
                <div className="mt-2">
                    <input
                    id="borrower_name"
                    name="borrower_name"
                    type="text"
                    className="input input-bordered w-full"
                    />
                </div>
                </div>

                <div className="flex flex-col">
                <label htmlFor="borrower_id" className="block text-sm font-medium leading-6 text-gray-900">
                    Borrower's ID
                </label>
                <div className="mt-2">
                    <input
                    id="borrower_id"
                    name="borrower_id"
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
                <label htmlFor="asset" className="block text-sm font-medium leading-6 text-gray-900">
                    Item(s) to borrow
                </label>
                <div className="mt-2">
                    {assets.map((prop:Asset) => {
                        return <BCheckbox 
                        key={prop.asset_id} 
                        label={prop.asset_name} 
                        name="assets[]"
                        asset_id={prop.asset_id}
                        disabled={prop.asset_status != 'available' ? true : false}
                        />
                    } )}
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
                        min={toJSONLocal(new Date())}
                        value={formData.date_borrowed}
                        onChange={handleChange}
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
                        min={formData.date_borrowed || toJSONLocal(new Date())}
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex flex-row gap-2">
                <BCheckbox name="agreement" />
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
      {toastMessage && <BToast message={toastMessage} />}
    </form>
    )
}