import { getCurrentUser } from "@/data/user";
import { ErrorAndSuccessType, MessageInputSchema } from "@/lib/schema";
import prisma from "@/utils/db/db";
import { TypeOf, z } from "zod";

export async function sendMessageAction(
  values: z.infer<typeof MessageInputSchema>,
  conversationId: string,
): Promise<ErrorAndSuccessType> {
  const validatedField = MessageInputSchema.safeParse(values);

  if (!validatedField.success) {
    throw new Error("Invalid data");
  }

  const { body } = validatedField.data;

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return { error: "Unauthorized" };
    }

    const newConversation = await prisma.message.create({
      data: {
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
            id: newConversation.id,
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

    return {};
  } catch (error) {
    console.error(error);
    throw error;
  }
}
