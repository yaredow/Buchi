"use client";

import Link from "next/link";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Conversation, Message, User } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/navigation";
import DefaultPf from "@/../public/images/Default_pfp.svg";

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
  const router = useRouter();

  const handleConversationClick = async (conversationId: string) => {
    router.push(`/conversations/${conversationId}`);
  };

  if (!conversations || !currentLoggedInUserId) return null;

  return (
    <div className="group relative flex h-full flex-col gap-4 p-2 data-[collapsed=true]:p-2">
      <div className="flex items-center justify-between p-2">
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

      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {conversations.map((conversation, index) => {
          // Find the other user in the conversation
          const lastMessage =
            conversation.messages[conversation.messages.length - 1];
          const otherUser = conversation.users.find(
            (user) => user.id !== currentLoggedInUserId,
          );

          const variant = otherUser ? "grey" : "ghost";

          if (!otherUser) return null;

          return (
            <div
              key={index}
              onClick={() => {
                handleConversationClick(conversation.id);
              }}
            >
              <Link
                key={index}
                href="#"
                className={cn(
                  buttonVariants({ variant, size: "xl" }),
                  variant === "grey" &&
                    "shrink dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  "justify-start gap-4",
                )}
              >
                <Avatar className="flex items-center justify-center">
                  <AvatarImage
                    src={otherUser.image || DefaultPf}
                    alt={otherUser.name || ""}
                    width={6}
                    height={6}
                    className="h-10 w-10"
                  />
                </Avatar>
                <div className="flex max-w-28 flex-col">
                  <span>{otherUser.name}</span>
                  {conversation.messages.length > 0 ? (
                    <span className="truncate text-xs text-muted-foreground">
                      {lastMessage.body}
                    </span>
                  ) : (
                    <span className="truncate text-xs text-muted-foreground">
                      Start a conversation
                    </span>
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
