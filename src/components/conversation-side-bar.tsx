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

    const newHandler = (conversation: ConversationWithDetails) => {
      setConversations((prevConversations) => {
        if (find(prevConversations, { id: conversation.id })) {
          return prevConversations;
        } else {
          return [...prevConversations, conversation];
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
          ...prev.filter((conversation) => conversation.id !== conversation.id),
        ];
      });

      if (conversationId === conversation.id) {
        router.push("/conversations");
      }
    };

    pusherClient.subscribe(pusherkey);

    pusherClient.bind("converstion:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:delete", deleteHandler);

    return () => {
      pusherClient.unbind("converstion:new", newHandler);
      pusherClient.unbind("converstion:update", updateHandler);
      pusherClient.unbind("converstion:delete", deleteHandler);
    };
  }, [pusherkey, conversationId, router]);

  return (
    <div className="group relative flex min-h-[80vh] w-[28%] flex-col gap-4 border-r p-2">
      <div className="mb-4 flex items-center justify-between p-2">
        <div className="flex items-center gap-2 text-2xl">
          <p className="font-medium">Messages</p>
          <span className="text-zinc-300">
            {conversations.length > 0 ? `${conversations.length}` : null}
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
          <ul className="flex flex-col gap-6">
            {conversations.map((conversation, index) => (
              <li key={index}>
                <ConversationItem
                  currentLoggedInUserId={currentLoggedInUserId!}
                  conversation={conversation}
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
