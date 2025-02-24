import { prisma } from "@/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { borrow_id: string } }
) {
  try {
    const reqBody = await req.json();
    const borrowId = params.borrow_id;

    const assetIds = reqBody.map((item: any) => item.assets.asset_id);

    const [borrowRecord, borrowItems, borrowAssets] = await prisma.$transaction(
      [
        prisma.borrow_records.update({
          where: { borrow_id: borrowId },
          data: { borrow_status: "completed" },
        }),

        prisma.borrow_items.updateManyAndReturn({
          where: {
            borrow_id: borrowId,
          },
          data: { item_status: "returned" },
        }),

        prisma.assets.updateManyAndReturn({
          where: { asset_id: { in: assetIds } },
          data: { asset_status: "available" },
        }),
      ]
    );

    return NextResponse.json(
      {
        message: "Successfuly updated",
        data: { borrowRecord, borrowItems, borrowAssets },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, error: error },
      { status: 500 }
    );
  }
}
