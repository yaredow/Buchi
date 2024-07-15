import prisma from "@/utils/db/db";
import { getCurrentUser } from "./user";

export async function getConversationById(conversationId: string) {
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
      },
    });

    return conversation;
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
      include: { users: true, messages: true },
    });

    if (!conversations) {
      return null;
    }

    return conversations;
  } catch (error: any) {
    return null;
  }
}
