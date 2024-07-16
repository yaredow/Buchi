import prisma from "@/utils/db/db";
import { getCurrentUser } from "./user";
import { Conversation, Message, User } from "@prisma/client";

type ConversationExtendedType = Conversation & {
  messages: Message[];
  users: User[];
};

export async function getConversationById(
  conversationId: string,
): Promise<ConversationExtendedType | null> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
        messages: true,
      },
    });

    return conversation as ConversationExtendedType;
  } catch (error: any) {
    return null;
  }
}

export async function getConversations() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }

    const conversations = await prisma.conversation.findMany({
      where: { users: { some: { id: currentUser.id } } },
      include: { users: true, messages: true },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!conversations) {
      return null;
    }

    return conversations;
  } catch (error: any) {
    return null;
  }
}
