import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

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
  } catch (error: any) {
    return NextResponse.json({
      error: "Something went wrong",
      details: error.message,
    });
  }
}
