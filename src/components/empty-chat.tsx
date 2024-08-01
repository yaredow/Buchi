"use client";

import EmptyImage from "@/../public/images/doggoEmpty.png";
import Image from "next/image";
import { FullConversationType } from "@/app/types/conversation";
import ConversationItem from "./conversations/conversation-item";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import useConversation from "@/utils/hook/useConversation";
import ConversationSearch from "./conversations/conversation-search";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { MoreHorizontal, SquarePen } from "lucide-react";

type EmptyStateProps = {
  thereAreConversations: boolean;
  conversations: FullConversationType[];
};

export default function EmptyState({
  thereAreConversations,
  conversations: initialConversations,
}: EmptyStateProps) {
  const [conversations, setConversations] =
    useState<FullConversationType[]>(initialConversations);
  const session = useSession();
  const { conversationId } = useConversation();
  const { currentLoggedInUserId } = useMemo(() => {
    return {
      currentLoggedInUserId: session?.data?.user?.id,
    };
  }, [session?.data?.user?.id]);

  const handleSearch = (query: string) => {
    if (!query) {
      setConversations(initialConversations);
    } else {
      const filtered = initialConversations.filter((conversation) =>
        conversation.users.some((user) =>
          user.name?.toLowerCase().includes(query.toLowerCase()),
        ),
      );
      setConversations(filtered);
    }
  };

  return (
    <>
      <main className="hidden h-full flex-col items-center justify-center md:flex">
        {thereAreConversations ? (
          <div className="flex flex-col">
            <Image
              src={EmptyImage}
              alt="A kid hugging a doggo"
              width={200}
              height={200}
            />
            <div className="flex flex-col items-center text-center">
              <h3 className="mt-2 text-2xl font-semibold">
                Select a conversation
              </h3>
            </div>{" "}
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <h3 className="mt-2 text-2xl font-semibold">
              No conversations yet
            </h3>
            <p className="text-sm text-zinc-500">
              Check a dog breed to start a conversation with the owner
            </p>
          </div>
        )}
      </main>

      {/* Mobile view */}
      <div className="flex w-full flex-col md:hidden">
        <div className="mb-2 flex w-full items-center justify-between border-b">
          <div className="flex items-center gap-2 text-2xl">
            <p className="text-lg font-medium">Messages</p>
            <span className="text-lg text-slate-300">
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

        <ConversationSearch onSearch={handleSearch} />
        {conversations.length > 0 ? (
          <div className="w-full">
            <ul className="flex flex-col gap-1">
              {conversations.map((conversation, index) => (
                <li key={index} className="w-full">
                  <ConversationItem
                    currentLoggedInUserId={currentLoggedInUserId as string}
                    conversation={conversation}
                    isSelectedConversation={conversationId === conversation.id}
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-4 text-center">No conversations found</div>
        )}
      </div>
    </>
  );
}
