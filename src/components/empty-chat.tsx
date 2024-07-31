"use client";

import EmptyImage from "@/../public/images/doggoEmpty.png";
import Image from "next/image";
import { FullConversationType } from "../../types/conversation";
import ConversationItem from "./conversations/conversation-item";
import { useMemo } from "react";
import { useSession } from "next-auth/react";
import useConversation from "@/utils/hook/useConversation";
import EmptyDoggo from "@/../public/images/EmptyDog2.png";

type EmptyStateProps = {
  thereAreConversations: boolean;
  conversations: FullConversationType[];
};

const EmptyState = ({
  thereAreConversations,
  conversations,
}: EmptyStateProps) => {
  const session = useSession();
  const { conversationId } = useConversation();
  const { currentLoggedInUserId } = useMemo(() => {
    return {
      currentLoggedInUserId: session?.data?.user?.id,
    };
  }, [session?.data?.user?.id]);

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
      <div className="flex md:hidden">
        {conversations.length > 0 ? (
          <div className="grid gap-1 px-2">
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
    </>
  );
};

export default EmptyState;
