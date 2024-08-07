import { auth } from "@/auth";
import { getCurrentUser } from "@/data/user";
import prisma from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const breedId = request.url.slice(request.url.lastIndexOf("/") + 1);

  const currentUser = await getCurrentUser();

  try {
    const dogOwners = await prisma.user.findMany({
      where: { breedId, email: { not: currentUser?.email } },
      include: { breed: true },
    });

    if (!dogOwners) {
      return NextResponse.json(
        { message: "No dog owners found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ dogOwners });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
