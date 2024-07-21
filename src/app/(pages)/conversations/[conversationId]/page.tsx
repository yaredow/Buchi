import ConversationList from "@/components/conversations/conversation-list";
import ConversationTopbar from "@/components/conversations/conversation-top-bar";
import { getConversationById } from "@/data/conversations";
import { getCurrentUser } from "@/data/user";
import { User } from "@prisma/client";

type Iparam = {
  params: { conversationId: string };
};

export default async function Page({ params }: Iparam) {
  const { conversationId } = params;
  const conversation = await getConversationById(conversationId);
  const currentLoggedInUser = await getCurrentUser();
  const selectedUser = conversation?.users.find(
    (user) => user.id !== currentLoggedInUser?.id,
  ) as User;

  if (!conversation || !currentLoggedInUser) return null;

  return (
    <div className="flex h-[80vh] w-full flex-col justify-between">
      <ConversationTopbar selectedUser={selectedUser} />

      <ConversationList
        messages={conversation.messages}
        selectedUser={selectedUser}
        conversationId={conversation.id}
        currentUser={currentLoggedInUser}
      />
    </div>
  );
}
