import prisma from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const slug = request.url.slice(request.url.lastIndexOf("/") + 1);

  try {
    const breed = await prisma.breed.findFirst({ where: { slug } });

    if (!breed) {
      return NextResponse.json({ message: "Breed not found" }, { status: 404 });
    }

    return NextResponse.json({ breed });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
