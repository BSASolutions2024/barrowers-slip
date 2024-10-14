const sql = require('better-sqlite3')
const db = sql('company-property-borrowed.db')

const tests = [
    {
        slug: '',
        date: '2024-09-25',
        borrowers_name: 'Anne Casas',
        borrowers_id: 'BSA-0376',
        location: 'BSA',
        contact_no: '9327283736',
        items_borrowed: 'Rode Mic 1, Rode Mic 2',
        description: 'Intern- Bridging Program Class Set-up',
        date_borrowed: '2024-09-25',
        return_date: '2024-09-26',
        agreement: 0,
        returned: 0
    }
]

db.prepare(`
    CREATE TABLE IF NOT EXISTS property_borrowed_list (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       slug TEXT NOT NULL UNIQUE,
       date TEXT NOT NULL,
       borrowers_name TEXT NOT NULL,
       borrowers_id TEXT NOT NULL,
       location TEXT NOT NULL,
       contact_no TEXT NOT NULL,
       items_borrowed TEXT NOT NULL,
       description TEXT NOT NULL,
       date_borrowed TEXT NOT NULL,
       return_date TEXT NOT NULL,
       agreement TEXT NOT NULL
    )
`).run()

db.prepare(`
    ALTER TABLE property_borrowed_list ADD COLUMN returned INTEGER;
    `).run()




async function initData() {
    const stmt = db.prepare(`
        INSERT INTO property_borrowed_list VALUES (
            null,
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
     `);

    for (const test of tests) {
        stmt.run(test)
    }
}

initData()