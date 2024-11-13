"use client"

import BDialog from "@/components/ui/bsa_dialog/BDialog";
import BToast from "@/components/ui/bsa_toast/Btoast";
import { createAsset } from "@/lib/Actions/assets";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

const initialState: any = {message: '', errors: {}}


export default function AssetForm() {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [isOpen, setModal] = useState<boolean>(false);
    const [state, formAction] = useFormState(createAsset, initialState)

    useEffect(() => {
        if (state?.message) {
            setToastMessage(state.message);

            setTimeout(() => {
                setToastMessage(null)
                
            }, 2000)

            setModal(false)
        }
    }, [state]);



    return (
        <>
            <button type="button" className="btn" onClick={() => setModal(true)}>Add</button>
            <BDialog isOpen={isOpen}>
                <form action={formAction}>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" type="button" onClick={() => setModal(false)}>✕</button>
                    <div className="flex flex-col">
                        <label htmlFor="asset_name" className="block text-sm font-medium leading-6 text-gray-900">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                            id="asset_name"
                            name="asset_name"
                            type="text"
                            className="input input-bordered w-full"
                            />
                        </div>
                    </div>
                    <div>
                    <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        >
                        Submit
                        </button>
                        <button
                        type="button"
                        data-autofocus
                        onClick={() => setModal(false)}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                        Cancel
                        </button>
                    </div>
                    </div>
                </form>
            </BDialog>
            {toastMessage && <BToast message={toastMessage} />}
            
        </>
    )
}