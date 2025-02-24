import { prisma } from "@/db";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const skip = searchParams.get("page")
  try {
    const data = await prisma.borrow_records.findMany({
      skip: 0,
      take: 20,
      orderBy: [{ borrow_status: "desc" }, { borrow_date: "desc" }],
      include: {
        borrow_items: {
          include: {
            assets: true,
          },
        },
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      error: "Something went wrong",
      details: error.message,
    });
  }
}

export async function POST(req: NextRequest) {
  const uuid = randomUUID();

  try {
    const formData = await req.json();

    const { assets, ...borrow_record } = formData;

    const assetPayload = assets.map((asset_id: string) => {
      const borrow_item_id = randomUUID();
      return {
        borrow_item_id,
        borrow_id: uuid,
        asset_id: asset_id,
        item_status: "borrowed",
        return_date: borrow_record.return_date,
      };
    });

    const [borrowRecord, borrowItems, borrowAssets] = await prisma.$transaction([
      prisma.borrow_records.create({
        data: { ...borrow_record, borrow_id: uuid },
      }),
      prisma.borrow_items.createManyAndReturn({ data: assetPayload }),
      prisma.assets.updateManyAndReturn({
        where: { asset_id: { in: assets } },
        data: { asset_status: "borrowed" },
      }),
    ]);

    return NextResponse.json(
      { message: "Success", data: { borrowRecord, borrowItems, borrowAssets } },
      { status: 201 }
    );
  } catch (err: any) {
    if (err instanceof ZodError) {
      return NextResponse.json({ errors: err.flatten() }, { status: 400 });
    }

    return NextResponse.json(
      { message: err.message, error: err },
      { status: 500 }
    );
  }
}
