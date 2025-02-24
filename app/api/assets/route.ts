import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const assets = await prisma.assets.findMany({
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(assets, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      error: "Something went wrong",
      details: error.message,
    });
  }
}

export async function POST(req: NextRequest) {
  const uuid = crypto.randomUUID();

  try {
    const data = await req.json();

    const body = { ...data, asset_id: uuid, asset_status: 'available' }

    const response = await prisma.assets.create({
      data: body,
    });

    return NextResponse.json(
      { message: "Successfully Created", response },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({
      error: error,
      message: error.message,
    });
  }
}
