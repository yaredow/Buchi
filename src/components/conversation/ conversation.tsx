"use client";

import MessageList from "./message-list";
import MessageInput from "./message-input";
import useConversation from "@/utils/hook/useConversation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/formatName";

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
      <div className="h-[70vh] w-full">
        <div className="flex w-full items-center border-b px-4 py-2">
          <div className="flex items-center">
            <Avatar className="mr-4">
              <AvatarImage src={users[0].image} />
              <AvatarFallback>{getInitials(users[0].name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold">{users[0].name}</span>
              <span className="text-sm text-gray-500">{users[0].bio}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <MessageList messages={messages} />
        </div>
      </div>
      <MessageInput sendMessage={sendMessage} senderId={users[0].id} />
    </main>
  );
}
