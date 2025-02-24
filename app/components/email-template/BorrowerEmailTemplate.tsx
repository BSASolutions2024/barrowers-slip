import { formatDateReadable } from "@/lib/helper";
import { Asset } from "@/lib/interface";
import { BorrowFormValues } from "@/lib/schemas/borrowSchema";

export default function BorrowerEmailTemplate({
  borrowRecord,
  borrowedAssets,
  type,
}: {
  borrowRecord: BorrowFormValues;
  borrowedAssets: Asset[];
  type:'borrow_confirmation' | 'return_confirmation'
}) {
  const assetList = borrowedAssets
    .map((asset) => `<li style="margin: 8px 0;">${asset}</li>`)
    .join("");
  const borrowDate = formatDateReadable(borrowRecord.borrow_date);
  const returnDate = formatDateReadable(borrowRecord.return_date);
  const location = borrowRecord.location.toUpperCase();

  const htmlContent = `
    <div style="font-family: Helvitica, Arial, sans-serif; background-color: #f4f4f4; color: #333; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px;">
        <h1 style="text-align: center; color: #fac60c;">Borrower's Slip</h1>
        <p style="text-align: center; margin: 30px 0;"><strong>Confirmation of Your Borrower Slip Booking</strong></p>
        <div style="margin-bottom: 20px;">
          <p>Hi ${borrowRecord.borrower_name},</p><br>
          <p>We are pleased to inform you that your borrowing request has been successfully recorded. Below are the details of your request. You may now proceed to collect the items you have borrowed.</p><br>
          <p><strong>Borrow Date:</strong> ${borrowDate}</p>
          <p><strong>Expected return date:</strong> ${returnDate}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Assets Borrowed:</strong></p>
          <ul>
             ${assetList}
          </ul>
          <br>
          <p>Please ensure that all assets are returned in good condition on or before the due date. If you have any questions or need further assistance, feel free to reach out.</
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

  const htmlContentReturn = `
    <div style="font-family: Helvitica, Arial, sans-serif; background-color: #f4f4f4; color: #333; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px;">
        <h1 style="text-align: center; color: #fac60c;">Borrower's Slip</h1>
        <p style="text-align: center; margin: 30px 0;"><strong>Return Confirmation</strong></p>
        <div style="margin-bottom: 20px;">
          <p>Hi ${borrowRecord.borrower_name},</p><br>
          <p>We sincerely appreciate your prompt return of the borrowed item(s).</p>
          <p>If you need to borrow any items in the future click the link below or have any questions, please feel free to reach out.</p><br>
          <a href="borrower-slip.vercel.app">Borrower Slip</a>
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

  if(type == "borrow_confirmation") return htmlContent

  return htmlContentReturn
}
