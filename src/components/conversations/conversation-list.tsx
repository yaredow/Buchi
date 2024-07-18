import { getConversations } from "@/data/conversations";
import ConversationItem from "./conversation-item";
import { getCurrentUser } from "@/data/user";

export default async function ConversationList() {
  const conversations = await getConversations();
  const currentUser = await getCurrentUser();
  const currentUserId = currentUser?.id as string;

  if (!conversations) return <div>No conversaion found</div>;
  return (
    <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
      {conversations.map((conversation, index) => (
        <ConversationItem
          key={index}
          currentUserId={currentUserId}
          conversation={conversation}
        />
      ))}
    </nav>
  );
}
