import { getCurrentUser } from "@/data/user";
import { uploadChatImage } from "@/server/actions/conversation/actions";
import prisma from "@/utils/db/db";
import { pusherServer } from "@/utils/pusher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(reques: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    const formData = await reques.formData();
    const body = formData.get("body") as string;
    const conversationId = formData.get("conversationId") as string;
    const image = formData.get("image") as File;

    if (!currentUser?.id || !currentUser?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let uploadedImage = "";
    if (image) {
      const result = await uploadChatImage(image);
      if (result?.url) {
        uploadedImage = result.url;
      } else {
        console.error("Image upload failed", result);
        return NextResponse.json(
          { message: "Image upload failed" },
          { status: 500 },
        );
      }
    }

    const newMessage = await prisma.message.create({
      data: {
        image: uploadedImage,
        body,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser?.id,
          },
        },
        seen: {
          connect: {
            id: currentUser?.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    await pusherServer.trigger(conversationId, "message:new", newMessage);
    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1];

    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, "conversation:update", {
        id: conversationId,
        messages: [lastMessage],
      });
    });

    return NextResponse.json(newMessage, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
