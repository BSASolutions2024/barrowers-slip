import { formatDateReadable } from "@/lib/helper";
import { Asset } from "@/lib/interface";
import { BorrowFormValues } from "@/lib/schemas/borrowSchema";

export default function AdminEmailTemplate({
  borrowRecord,
  borrowedAssets,
}: {
  borrowRecord: BorrowFormValues;
  borrowedAssets: Asset[];
}) {
  const assetList = borrowedAssets.map((asset) => `<li style="margin: 8px 0;">${asset}</li>`).join("");
  const borrowDate = formatDateReadable(borrowRecord.borrow_date)
  const returnDate = formatDateReadable(borrowRecord.return_date)
  const location = borrowRecord.location.toUpperCase()

  const htmlContent = `
    <div style="font-family: Helvitica, Arial, sans-serif; background-color: #f4f4f4; color: #333; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px;">
        <h1 style="text-align: center; color: #fac60c;">Borrower's Slip</h1>
        <p style="text-align: center; margin: 30px 0;"><strong>New Request</strong></p>
        <div style="margin-bottom: 20px;">
          <p><strong>Borrower Name:</strong> ${borrowRecord.borrower_name}</p>
          <p><strong>Borrower Email:</strong> ${borrowRecord.borrower_email}</p>
          <p><strong>Borrower ID:</strong> ${borrowRecord.borrower_id}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Borrow Date:</strong> ${borrowDate}</p>
          <p><strong>Expected return date:</strong> ${returnDate}</p>
          <p><strong>Assets Borrowed:</strong></p>
          <ul>
             ${assetList}
          </ul>
          <p><strong>Description:</strong> ${borrowRecord.description}</p>
          <a href="https://borrowers-slip.vercel.app/borrowers-list" style="display: inline-block;
              padding: 10px 15px;
              margin: 15px 0;
              font-size: 16px;
              color: #ffffff;
              background-color: #fac60c;
              text-decoration: none;
              border-radius: 5px;">Visit Borrowers List</a>
        </div>
        <div style="margin-top: 20px;
              font-size: 14px;
              color: #777;
              text-align: center;">
              <p>&copy; 2025 BSA Solutions Outsourcing Inc. All rights reserved.</p>
          </div>
      </div>
      
    </div>
  `;

  return htmlContent;
}
