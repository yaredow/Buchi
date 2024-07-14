import prisma from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const conversationId = request.url.slice(request.url.lastIndexOf("/") + 1);

  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) {
      return NextResponse.json(
        { message: "Conversation not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(conversation);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
