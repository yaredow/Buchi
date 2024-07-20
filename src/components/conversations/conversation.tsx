import React from "react";
import ConversationTopbar from "@/components/conversations/conversation-top-bar";
import ConversationList from "@/components/conversations/conversation-list";
import {
  Conversation as ConversationType,
  Message,
  User,
} from "@prisma/client";
import EmptyState from "../empty-chat";

type ConversationWithDetails = ConversationType & {
  users: User[];
  messages: Message[];
};

interface ChatProps {
  conversation: ConversationWithDetails | null;
  selectedUser: User;
  isMobile: boolean;
}

export default function Conversation({
  conversation,
  selectedUser,
  isMobile,
}: ChatProps) {
  if (!conversation) return <EmptyState />;

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <ConversationTopbar selectedUser={selectedUser} />

      <ConversationList
        messages={conversation.messages}
        selectedUser={selectedUser}
      />
    </div>
  );
}
