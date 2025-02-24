'use client'

import { cn } from '@/lib/utils'

const BDropdown =(props:any) => {
  
    return (
        <select className={cn("select select-bordered w-full", props.className)} name={props.name} {...props.register} defaultValue="">
            <option disabled value="">Select Location</option>
            <option value="bsa">BSA</option>
            <option value="5elk">5ELK</option>
        </select>
    )
}

export default BDropdown