"use client";

import Link from "next/link";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Conversation, Message, User } from "@prisma/client";
import ConversationItem from "./conversations/conversation-item";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/utils/pusher";
import { find } from "lodash";
import useConversation from "@/utils/hook/useConversation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import EmptyDoggo from "@/../public/images/EmptyDog2.png";

type ConversationWithDetails = Conversation & {
  users: User[];
  messages: Message[];
};

type SidebarProps = {
  conversations: ConversationWithDetails[];
};

export default function ConversationSidebar({
  conversations: initialConversations,
}: SidebarProps) {
  const [conversations, setConversations] =
    useState<ConversationWithDetails[]>(initialConversations);
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

    const newHandler = (conversation: ConversationWithDetails) => {
      setConversations((prevConversations) => {
        if (find(prevConversations, { id: conversation.id })) {
          return prevConversations;
        } else {
          return [conversation, ...prevConversations];
        }
      });
    };

    const updateHandler = (conversation: ConversationWithDetails) => {
      setConversations((prev) =>
        prev.map((prevConversation) => {
          if (prevConversation.id === conversation.id) {
            return {
              ...prevConversation,
              messages: conversation.messages,
            };
          }

          return prevConversation;
        }),
      );
    };

    const deleteHandler = (conversation: ConversationWithDetails) => {
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
    <div className="group relative flex min-h-[80vh] w-[28%] flex-col gap-4 border-r">
      <div className="mb-4 flex items-center justify-between border-b px-2 md:py-[18.8px]">
        <div className="flex items-center gap-2 text-2xl">
          <p className="font-medium">Messages</p>
          <span className="text-slate-300">
            {conversations && conversations.length > 0
              ? `(${conversations.length})`
              : null}
          </span>
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
        <div className="my-auto flex items-center justify-center">
          <Image
            src={EmptyDoggo}
            width={250}
            height={500}
            alt="a woman with a dog image"
          />
        </div>
      )}
    </div>
  );
}
