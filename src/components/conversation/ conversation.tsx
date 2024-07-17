import MessageList from "./message-list";
import MessageInput from "./message-input";
import { getConversationById } from "@/data/conversations";
import ConversationTopbar from "./conversation-header";

type ConversationProps = {
  conversationId: string;
  currentUserId: string;
};

export default async function Conversation({
  conversationId,
  currentUserId,
}: ConversationProps) {
  const conversation = await getConversationById(conversationId);

  if (!conversation) return <div>No conversations found</div>;

  return (
    <main className="flex h-full w-full flex-grow flex-col">
      <div className="w-full">
        <ConversationTopbar
          selectedUser={conversation.users}
          currentUserId={currentUserId}
        />

        <div className="flex-1 p-4">
          <MessageList messages={conversation?.messages} />
        </div>
      </div>

      <MessageInput conversationId={conversationId} />
    </main>
  );
}
