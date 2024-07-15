import { getCurrentUser } from "@/data/user";
import ConversationItem from "./conversation-ltem";
import { getConversations } from "@/data/conversations";

export default async function ConversationList() {
  const conversations = await getConversations();
  const currentUser = await getCurrentUser();
  const currentUserId = currentUser?.id as string;

  return (
    <main className="p-4">
      {conversations?.map((conversation, index) => (
        <ConversationItem
          key={index}
          conversation={conversation}
          currentUserId={currentUserId}
        />
      ))}
    </main>
  );
}
