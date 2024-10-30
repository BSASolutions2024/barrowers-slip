'use client'

import { Checkbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

const BCheckbox = ({asset_id, label, name, disabled}:{asset_id?:string, label?:string, name:string, disabled?:boolean}) => {
    const [enabled, setEnabled] = useState(true)
    

    return (
        <div className="form-control">
            <label className="cursor-pointer flex flex-row p-2 gap-2">
                <Checkbox 
                    onChange={setEnabled} 
                    className="checkbox checkbox-warning data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:data-[disabled]:bg-gray-500" 
                    name={name} 
                    value={asset_id} 
                    disabled={disabled}></Checkbox>
                <span className="label-text">{label}</span>
            </label>
        </div>
    );
}

export default BCheckbox;