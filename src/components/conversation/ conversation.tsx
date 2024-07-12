"use client";

import Image from "next/image";
import MessageList from "./message-list";
import MessageInput from "./message-input";
import useConversation from "@/utils/hook/useConversation";

export default function Conversation({
  conversationId,
}: {
  conversationId: string;
}) {
  const conversation: any = useConversation(conversationId);
  Conversation;

  const { users, messages } = conversation;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center border-b border-gray-300 p-4">
        {users.map((user: any) => (
          <div key={user.id} className="mr-4 flex items-center">
            <Image
              src={user.image}
              alt={user.name}
              height={50}
              width={50}
              className="mr-2 h-10 w-10 rounded-full"
            />
            <div>
              <div className="font-bold">{user.name}</div>
              <div className="text-sm text-gray-500">@{user.username}</div>
            </div>
          </div>
        ))}
      </div>

      <MessageList messages={messages} />
      <MessageInput conversationId={conversationId} />
    </div>
  );
}
