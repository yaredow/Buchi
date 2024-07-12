"use client";

import useConversations from "@/utils/hook/useConversations";
import ConversationItem from "./conversation-ltem";

export default function ConversationList({}) {
  const conversations = useConversations();
  return (
    <main className="p-4">
      {conversations.map((conversation, index) => (
        <ConversationItem key={index} conversation={conversation} />
      ))}
    </main>
  );
}
