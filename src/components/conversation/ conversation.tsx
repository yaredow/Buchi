import MessageList from "./message-list";
import MessageInput from "./message-input";
import ConversationHeader from "./conversation-header";
import { getConversationById } from "@/data/conversations";

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
      <div className="flex h-full flex-col">
        <ConversationHeader
          currentUserId={currentUserId}
          users={conversation?.users}
        />

        <div className="flex-1 overflow-y-auto p-4">
          <MessageList messages={conversation?.messages} />
        </div>

        <MessageInput conversationId={conversationId} />
      </div>
    </main>
  );
}
