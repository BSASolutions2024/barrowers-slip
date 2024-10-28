"use client"

import BToast from "@/components/ui/bsa_toast/Btoast";
import { createAsset } from "@/lib/Actions/assets";
import { State } from "@/lib/interface";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const initialState: any = {message: '', errors: {}}

function SubmitButton() {
    const { pending } = useFormStatus();
    console.log()
    return (
      <button type="submit" aria-disabled={pending}>
        Add
      </button>
    );
  }

export default function AssetForm() {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    
    

    const [state, formAction] = useFormState(createAsset, initialState)


    useEffect(() => {
        if (state?.message) {
            setToastMessage(state.message);

            setTimeout(() => {
                setToastMessage(null)
            }, 2000)
        }
    
    }, [state]);

    return (
        <>
        <a href="#addAssetModal" className="btn btn-sm" >Add</a>
            <div className="modal" role="dialog" id="addAssetModal">
                <div className="modal-box">
            <form action={formAction}>
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
            
                <div className="modal-action">
                    {/* <button type="submit" className="btn">Yay!</button> */}
                    <SubmitButton />
                </div>
            </form>
            </div>
            </div>
            {toastMessage && <BToast message={toastMessage} />}
        </>
    )
}