export type State = {
    message?: string | null
    errors?: {},
}

export type Asset = {
    asset_id:string,
    asset_name: string,
    asset_type?: string,
    asset_status: 'available' | 'borrowed' | 'maintenance',
    created_at: string
}

export type BorrowItem = {
    borrow_item_id:string,
    borrow_id: string,
    asset_id: string,
    item_status: 'borrowed' | 'returned',
    return_date: string
}

export type BorrowRecord = {
    borrow_id:string,
    borrower_name:string,
    borrower_email:string,
    borrow_date:string,
    return_date:string,
    borrow_status?: 'open' | 'completed',
    admin_id:string,
    borrower_id: string,
    contact_no: string,
    description: string,
    agreement: string,
    created_at: string
}

export type Admin = {
    id:string,
    name: string,
    email:string
}