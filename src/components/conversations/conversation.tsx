import React from "react";
import ConversationTopbar from "@/components/conversations/conversation-top-bar";
import ConversationList from "@/components/conversations/conversation-list";
import { Message, User } from "@prisma/client";
import useGetMessages from "@/utils/hook/useGetMessages";

interface ChatProps {
  conversationId: string;
  selectedUser: User;
  isMobile: boolean;
}

export default function Conversation({
  conversationId,
  selectedUser,
  isMobile,
}: ChatProps) {
  const { messages, isFetching } = useGetMessages(conversationId);

  if (isFetching)
    return <div className="grid items-center justify-center">Loading...</div>;
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <ConversationTopbar selectedUser={selectedUser} />

      <ConversationList
        messages={messages}
        selectedUser={selectedUser}
        isMobile={isMobile}
      />
    </div>
  );
}
