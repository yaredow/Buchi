import { getCurrentUser } from "@/data/user";
import prisma from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;
    const currentUser = await getCurrentUser();

    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: { equals: [currentUser?.id, userId] },
          },
          {
            userIds: { equals: [userId, currentUser?.id] },
          },
        ],
      },
    });

    const singleConversation = existingConversations[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser?.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal Server Error" });
  }
}
