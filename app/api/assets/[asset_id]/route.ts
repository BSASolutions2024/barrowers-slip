import { prisma } from "@/db";
import APIErrorHandler from "@/lib/APIErrorHandler";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(
  req: NextRequest,
  { params }: { params: { asset_id: string } }
) {

  const { asset_id } = params

  try {
    const data = await req.json()

    const updateAsset = await prisma.assets.update({
      where: { asset_id },
      data,
    })

    return NextResponse.json(updateAsset, { status: 200 })
  } catch (error: unknown) {
    return APIErrorHandler(error)
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { asset_id: string } }
) {
  const { asset_id } = params;

  try {

    const response = await prisma.assets.delete({
      where: {
        asset_id,
      },
    });

    return NextResponse.json(
      { message: "Asset successfully deleted", response },
      { status: 200 }
    );
  } catch (error: unknown) {
    return APIErrorHandler(error)
  }
}
