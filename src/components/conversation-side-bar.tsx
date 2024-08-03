"use client";

import Link from "next/link";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import ConversationItem from "./conversations/conversation-item";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/utils/pusher";
import { find } from "lodash";
import useConversation from "@/utils/hook/useConversation";
import { useRouter } from "next/navigation";
import { FullConversationType } from "@/app/types/conversation";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SidebarProps = {
  conversations: FullConversationType[];
};

export default function ConversationSidebar({
  conversations: initialConversations,
}: SidebarProps) {
  const [conversations, setConversations] =
    useState<FullConversationType[]>(initialConversations);
  const { data: session } = useSession();
  const { conversationId } = useConversation();
  const router = useRouter();

  const { pusherkey, currentLoggedInUserId } = useMemo(() => {
    return {
      pusherkey: session?.user?.email,
      currentLoggedInUserId: session?.user?.id,
    };
  }, [session?.user?.email, session?.user?.id]);

  useEffect(() => {
    if (!pusherkey) return;

    pusherClient.subscribe(pusherkey);

    const newHandler = (conversation: FullConversationType) => {
      setConversations((prevConversations) => {
        if (find(prevConversations, { id: conversation.id })) {
          return prevConversations;
        } else {
          return [conversation, ...prevConversations];
        }
      });
    };

    const updateHandler = (conversation: FullConversationType) => {
      setConversations((prev) =>
        prev.map((prevConversations) => {
          if (prevConversations.id === conversation.id) {
            return {
              ...prevConversations,
              messages: conversation.messages,
            };
          }

          return prevConversations;
        }),
      );
    };

    const deleteHandler = (conversation: FullConversationType) => {
      setConversations((prev) => {
        return [
          ...prev.filter(
            (preConversation) => preConversation.id !== conversation.id,
          ),
        ];
      });

      if (conversationId === conversation.id) {
        router.push("/conversations");
      }
    };

    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:delete", deleteHandler);

    return () => {
      pusherClient.unsubscribe(pusherkey);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:delete", deleteHandler);
    };
  }, [pusherkey, conversationId, router]);

  return (
    <div className="group relative hidden min-h-[80vh] flex-col gap-4 border-r md:flex md:w-[28%]">
      <div className="mb-2 flex items-center justify-between border-b px-2 md:py-[18.8px]">
        <div className="flex items-center gap-2 text-2xl">
          <p className="font-medium">Messages</p>
          <span className="text-slate-300">
            {conversations && conversations.length > 0
              ? `(${conversations.length})`
              : null}
          </span>
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <MoreHorizontal size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card md:w-[100px]">
              <DropdownMenuItem>Archive chat</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Mark as read</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {conversations.length > 0 ? (
        <div className="grid gap-1 px-2">
          <ul className="flex flex-col gap-1">
            {conversations.map((conversation, index) => (
              <li key={index} className="w-full">
                <ConversationItem
                  currentLoggedInUserId={currentLoggedInUserId!}
                  conversation={conversation}
                  isSelectedConversation={conversationId === conversation.id}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center">No conversations found</div>
      )}
    </div>
  );
}
