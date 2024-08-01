import ConversationTopbar from "@/components/conversations/conversation-top-bar";
import { getConversationById } from "@/data/conversations";
import { getCurrentUser } from "@/data/user";
import { User } from "@prisma/client";
import MessageList from "@/components/conversations/message-list";
import { FullConversationType } from "@/app/types/conversation";

type Iparam = {
  params: { conversationId: string };
};

export default async function Page({ params }: Iparam) {
  const { conversationId } = params;
  const conversation = (await getConversationById(
    conversationId,
  )) as FullConversationType;
  const currentLoggedInUser = await getCurrentUser();
  const selectedUser = conversation?.users.find(
    (user) => user.id !== currentLoggedInUser?.id,
  ) as User;

  if (!conversation || !currentLoggedInUser) return null;

  return (
    <div className="flex h-[95vh] w-full flex-col justify-between md:h-[80vh]">
      <ConversationTopbar
        selectedUser={selectedUser}
        conversationId={conversationId}
      />

      <MessageList
        messages={conversation.messages}
        selectedUser={selectedUser}
        conversationId={conversation.id}
        currentUser={currentLoggedInUser}
      />
    </div>
  );
}
