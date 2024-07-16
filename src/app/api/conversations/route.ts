import prisma from "@/utils/db/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const conversations = await prisma.conversation.findMany({
      include: {
        messages: true,
        users: true,
      },
    });

    if (!conversations) {
      return new Response("No conversations found", { status: 404 });
    }

    return NextResponse.json(conversations);
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
