"use client";

import Link from "next/link";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Conversation, Message, User } from "@prisma/client";
import ConversationItem from "./conversations/conversation-item";

type ConversationWithDetails = Conversation & {
  users: User[];
  messages: Message[];
};

type SidebarProps = {
  conversations: ConversationWithDetails[];
  currentLoggedInUserId: string;
};

export default function ConversationSidebar({
  conversations,
  currentLoggedInUserId,
}: SidebarProps) {
  if (!conversations || !currentLoggedInUserId) return null;

  return (
    <div className="group relative flex min-h-[80vh] w-[28%] flex-col gap-4 border-r p-2">
      <div className="mb-4 flex items-center justify-between p-2">
        <div className="flex items-center gap-2 text-2xl">
          <p className="font-medium">Chats</p>
          <span className="text-zinc-300">({conversations.length})</span>
        </div>

        <div>
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
            )}
          >
            <MoreHorizontal size={20} />
          </Link>

          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
            )}
          >
            <SquarePen size={20} />
          </Link>
        </div>
      </div>

      <div className="grid gap-1 px-2">
        <ul className="flex flex-col gap-6">
          {conversations.map((conversations, index) => (
            <li key={index}>
              <ConversationItem
                currentLoggedInUserId={currentLoggedInUserId}
                conversation={conversations}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
