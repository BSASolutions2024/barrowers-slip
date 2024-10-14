'use client'

import { useState } from 'react'

export default function BDropdown({name}:{name:string}) {
  
    return (
        <select className="select select-bordered w-full" name={name} defaultValue="">
            <option disabled value="">Select Location</option>
            <option value="bsa">BSA</option>
            <option value="5elk">5ELK</option>
        </select>
    )
}