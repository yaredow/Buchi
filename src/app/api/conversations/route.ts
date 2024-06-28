import { getCurrentUser } from "@/data/user";
import prisma from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const currentUser = await getCurrentUser();

    const existingConversations = await prisma.conversation.findMany({});
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal Server Error" });
  }
}
