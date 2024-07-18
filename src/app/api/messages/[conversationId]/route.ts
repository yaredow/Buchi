import prisma from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const conversationId = request.url.slice(request.url.lastIndexOf("/") + 1);

  try {
    const messages = await prisma.message.findMany({
      where: { conversationId },
      include: { sender: true, seen: true },
      orderBy: { createdAt: "asc" },
    });

    if (!messages) return NextResponse.json({ messages: "No message found" });

    return NextResponse.json(messages);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
