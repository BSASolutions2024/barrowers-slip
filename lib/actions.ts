'use server'

import { COMP_PROPERTIES, saveBorrowedItems, updateItem } from "@/lib/borrow";
import { toJSONLocal } from "./helper";


export async function borrowItem(formData:any) {

    const items_borrowed = COMP_PROPERTIES.reduce((acc:any, prop:any) => {
        if (formData.get(prop.trim().toLowerCase())) {
          acc.push(prop);
        }
        return acc;
      }, []);

    const borrowedData = {
        slug: `${toJSONLocal(new Date())} - ${formData.get('borrowers_name')}`,
        date: toJSONLocal(new Date()),
        borrowers_name: formData.get('borrowers_name'),
        borrowers_id: formData.get('borrowers_id'),
        location: formData.get('location'),
        contact_no: formData.get('contact_no'),
        items_borrowed: items_borrowed.toString(),
        description: formData.get('description'),
        date_borrowed: formData.get('date_borrowed'),
        return_date: formData.get('return_date'),
        agreement: formData.get('agreement'),
        returned: 0
    }

    await saveBorrowedItems(borrowedData)
  }

export async function returnItem(id:string, item:any) {
  
  await updateItem(id, item)
}

export async function deleteItem(id:number) {
  console.log("this is id", id)
}

