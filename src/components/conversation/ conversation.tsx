"use client";

import MessageList from "./message-list";
import MessageInput from "./message-input";
import ConversationHeader from "./conversation-header";
import useGetConversation from "@/utils/hook/useGetConversation";
import {
  Conversation as ConversationType,
  Message,
  User,
} from "@prisma/client";
import Spinner from "../Spinner";

type UseGetConversationType = {
  conversation: ConversationType & {
    users: User[];
    messages: Message[];
  };
  isFetching: boolean;
};

type ConversationProps = {
  conversationId: string;
  currentUserId: string;
};

export default function Conversation({
  conversationId,
  currentUserId,
}: ConversationProps) {
  const { conversation, isFetching }: UseGetConversationType =
    useGetConversation(conversationId);

  if (isFetching) {
    return (
      <div className="grid items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="flex h-full w-full flex-grow flex-col">
      <div className="min-h-[75vh] w-full">
        <ConversationHeader
          currentUserId={currentUserId}
          users={conversation.users}
        />

        <div className="flex-1 overflow-y-auto p-4">
          <MessageList messages={conversation.messages} />
        </div>
      </div>

      <MessageInput />
    </main>
  );
}
