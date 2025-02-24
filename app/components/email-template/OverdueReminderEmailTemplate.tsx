import { formatDateReadable } from "@/lib/helper";
import { Asset } from "@/lib/interface";
import { BorrowFormValues } from "@/lib/schemas/borrowSchema";

export default function OverdueReminderEmailTemplate({
  borrowRecord,
  borrowedAssets,
}: {
  borrowRecord: BorrowFormValues;
  borrowedAssets: Asset[];
}) {
  const assetList = borrowedAssets
    .map((asset) => `<li style="margin: 8px 0;">${asset}</li>`)
    .join("");
  const returnDate = formatDateReadable(borrowRecord.return_date);
  const borrowDate = formatDateReadable(borrowRecord.borrow_date);

  const htmlContent = `
    <div style="font-family: Helvitica, Arial, sans-serif; background-color: #f4f4f4; color: #333; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px;">
        <h1 style="text-align: center; color: #fac60c;">Borrower's Slip</h1>
        <p style="text-align: center; margin: 30px 0;"><strong>Overdue Reminder</strong></p>
        <div style="margin-bottom: 20px;">
            <p>Hi ${borrowRecord.borrower_name},</p><br>
            <p>We hope this email finds you well. This is a friendly reminder that the item(s) you borrowed are now overdue. Please return them as soon as possible to avoid any inconvenience.</p><br>
            <p><strong>Date Borrowed:</strong> ${borrowDate}</p>
            <p><strong>Due Date:</strong> ${returnDate}</p>
            <p><strong>Assets Borrowed:</strong></p>
            <ul>
                ${assetList}
            </ul>
            <p>If you have already returned the items, kindly disregard this message and inform marketing department. Thank you.</p><br>
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
