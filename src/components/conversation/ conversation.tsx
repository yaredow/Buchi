"use client";

import MessageList from "./message-list";
import MessageInput from "./message-input";
import useConversation from "@/utils/hook/useConversation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/formatName";
import ConversationHeader from "./conversation-header";

export default function Conversation({
  conversationId,
}: {
  conversationId: string;
}) {
  const { conversation, sendMessage } = useConversation(conversationId);

  if (!conversation || conversation.length === 0) return <div>loading...</div>;

  const { users, messages } = conversation;

  return (
    <main className="flex h-full w-full flex-grow flex-col">
      <div className="min-h-[75vh] w-full">
        <ConversationHeader users={users} />

        <div className="flex-1 overflow-y-auto p-4">
          <MessageList messages={messages} />
        </div>
      </div>

      <MessageInput sendMessage={sendMessage} senderId={users[0].id} />
    </main>
  );
}
