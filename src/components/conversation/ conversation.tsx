"use client";

import Image from "next/image";
import MessageList from "./message-list";
import MessageInput from "./message-input";
import useConversation from "@/utils/hook/useConversation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Conversation as ConvoType } from "../../../types/conversation";

export default function Conversation({
  conversationId,
}: {
  conversationId: string;
}) {
  const conversation: any = useConversation(conversationId);

  if (!conversation || conversation.length === 0) return <div>loading...</div>;

  const { users, messages } = conversation;

  return (
    <main className="flex h-full flex-1 flex-col">
      <div className="flex items-center border-b px-4 py-2">
        <div className="flex items-center">
          <Avatar className="mr-4">
            <AvatarImage src={users[0].image} />
            <AvatarFallback>MM</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold">{users[0].name}</span>
            <span className="text-sm text-gray-500">{users[0].bio}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4 flex justify-center">
          <span className="text-sm text-gray-500">June, 26 2024</span>
        </div>

        <div className="mb-4 flex justify-start">
          <div className="flex max-w-xs flex-col rounded-lg bg-white p-2 shadow">
            <span>selam nw silkun lemegzat nbr</span>
            <span className="self-end text-xs text-gray-500">13:58</span>
          </div>
        </div>

        <div className="mb-4 flex justify-end">
          <div className="flex max-w-xs flex-col rounded-lg bg-green-200 p-2 shadow">
            <span>Hi Mintu, Ale</span>
            <span className="self-end text-xs text-gray-500">14:06</span>
          </div>
        </div>

        <div className="mb-4 flex justify-end">
          <div className="flex max-w-xs flex-col rounded-lg bg-green-200 p-2 shadow">
            <span>0928315616 bezih silk dewl</span>
            <span className="self-end text-xs text-gray-500">15:25</span>
          </div>
        </div>
      </div>

      <MessageInput />
    </main>
  );
}
