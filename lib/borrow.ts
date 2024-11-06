
import sql from 'better-sqlite3'

const db = sql('company-property-borrowed.db')

export async function getBorrowersList () {
    return db.prepare(`SELECT * FROM property_borrowed_list`).all()
}

export async function getBorrowed_Items(){
    return db.prepare(`SELECT * FROM property_borrowed_list where returned = 0 `).all()
}

export async function updateItem(id:string, updates:any) {
    const columns = Object.keys(updates).filter(key => updates[key] !== undefined);
    
    if (columns.length === 0) {
        console.log('No fields to update');
        return; // Nothing to update
    }

    // Create the SET clause and values array
    const setClause = columns.map(col => `${col} = ?`).join(', ');
    const values = columns.map(col => updates[col]);

    // Prepare the SQL statement
    const stmt = db.prepare(`UPDATE property_borrowed_list SET ${setClause} WHERE id = ?`);
    
    // Add the ID to the values
    values.push(id);
    
    return stmt.run(...values);
}

export async function saveBorrowedItems (borrow_item:any) {
    return db.prepare(`
        INSERT INTO property_borrowed_list
        (slug, date, borrowers_name, borrowers_id, location, contact_no, items_borrowed, description, date_borrowed,return_date, agreement, returned)
        VALUES (
            @slug,
            @date,
            @borrowers_name,
            @borrowers_id,
            @location,
            @contact_no,
            @items_borrowed,
            @description,
            @date_borrowed,
            @return_date,
            @agreement,
            @returned
        )   
    `).run(borrow_item);
}

export async function deleteBorrowedItem(id:number) {
    return db.prepare(`DELETE FROM property_borrowed_list WHERE id=?`).run(id)
}

export const COMP_PROPERTIES = [
    'Rode Mic 1',
    'Rode Mic 2',
    'Phone',
    'Tripod',
    'JBL Speaker Big',
    'JBL Speaker Small',
    'Wireless Microphones',
    'Lighting',
    'Teleprompter',
]