export default function EmailNotification(body:any) {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
            <h2 className="card-title">New request</h2>
            <p><strong>Borrower Name:</strong> ${body.borrower_name}</p>
            <div className="card-actions">
                <a href="https://barrowers-slip.vercel.app/borrowers-list" className="btn btn-primary">Visit Borrowers List</a>
            </div>
            </div>
        </div>
    )
}