export type State = {
    message?: string | null
    errors?: {},
}

export type Asset = {
    asset_id:string,
    asset_name: string,
    asset_type?: string,
    asset_status: 'available' | 'borrowed' | 'maintenance'
}

export type BorrowItem = {
    id:string,
    borrow_id: string,
    asset_id: string,
    item_status: 'borrowed' | 'returned',
    return_date: string
}

export type BorrowRecord = {
    id:string,
    borrower_name:string,
    borrower_email:string,
    borrow_date:string,
    return_date:string,
    borrow_status: 'open' | 'completed',
    admin_id:string,
}

export type Admin = {
    id:string,
    name: string,
    email:string
}