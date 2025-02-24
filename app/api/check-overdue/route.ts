import OverdueReminderEmailTemplate from "@/app/components/email-template/OverdueReminderEmailTemplate";
import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function POST() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const response = await prisma.borrow_records.findMany({
      where: {
        borrow_status: "open",
        return_date: {
          gte: yesterday,
          lt: today,
        },
      },
      orderBy: [{ borrow_status: "desc" }, { borrow_date: "desc" }],
      include: {
        borrow_items: {
          include: {
            assets: true,
          },
        },
      },
    });

    for (const item of response) {
      const borrowedAssets = item.borrow_items.map(
        (asset: any) => asset.assets.asset_name
      );

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email-gmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: item.borrower_email,
          subject: `Overdue Reminder`,
          html: OverdueReminderEmailTemplate({
            borrowRecord: item as any,
            borrowedAssets,
          }),
        }),
      });

      console.log(response)
    }

    return NextResponse.json({ message: "Email sent" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      error: "Something went wrong",
      details: error.message,
    });
  }
}
