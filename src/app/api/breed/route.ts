import prisma from "@/utils/db/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const breeds = await prisma.breed.findMany();
    const length = breeds.length;

    if (!breeds)
      return NextResponse.json(
        { message: "There are not breeds" },
        { status: 404 },
      );

    return NextResponse.json({ breeds, length });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
