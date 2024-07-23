import { getCurrentUser } from "@/data/user";
import prisma from "@/utils/db/db";
import { pusherServer } from "@/utils/pusher";
import { NextRequest, NextResponse } from "next/server";

type IParams = {
  conversationId: string;
};

export async function DELETE(
  request: NextRequest,
  { params }: { params: IParams },
) {
  const { conversationId } = params;

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    existingConversation.users.map((user) => {
      pusherServer.trigger(
        user.email!,
        "conversation:delete",
        existingConversation,
      );
    });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
