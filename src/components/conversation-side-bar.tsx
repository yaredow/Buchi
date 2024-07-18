"use client";

import Link from "next/link";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Conversation, Message, User } from "@prisma/client";
import { SetStateAction } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useSession } from "next-auth/react";
import DefaultPfp from "@/../public/images/Default_pfp.svg";
import useGetConversations from "@/utils/hook/useGetConversations";

interface SidebarProps {
  isMobile: boolean;
  isCollapsed: boolean;
  onSelectUser: React.Dispatch<SetStateAction<User | null>>;
}

type UseConversationsType = {
  conversations: Conversation &
    {
      users: User[];
      messages: Message[];
    }[];
  isPending: boolean;
};

export default function ConversationSidebar({
  isCollapsed,
  onSelectUser,
  isMobile,
}: SidebarProps) {
  const { data: session } = useSession();
  const currentLoggedInUserId = session?.user?.id;
  const { conversations, isPending }: UseConversationsType =
    useGetConversations();

  if (isPending) return <div>Loading...</div>;

  return (
    <div
      data-collapsed={isCollapsed}
      className="group relative flex h-full flex-col gap-4 p-2 data-[collapsed=true]:p-2"
    >
      {!isCollapsed && (
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
      )}

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
            <div key={index} onClick={() => onSelectUser(otherUser)}>
              {isCollapsed ? (
                <TooltipProvider>
                  <Tooltip key={index} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        href="#"
                        className={cn(
                          buttonVariants({ variant: "grey", size: "lg" }), // Adjust variant based on your design
                          "justify-start gap-4",
                        )}
                      >
                        <Avatar className="flex items-center justify-center">
                          <AvatarImage
                            src={otherUser.image || DefaultPfp}
                            alt={otherUser.name || ""}
                            width={40} // Adjust size based on your design
                            height={40} // Adjust size based on your design
                            className="h-10 w-10"
                          />
                        </Avatar>
                        {!isCollapsed && (
                          <div className="flex max-w-28 flex-col">
                            <span>{otherUser.name}</span>
                            {conversation.messages.length > 0 ? (
                              <span className="truncate text-xs text-zinc-300">
                                {lastMessage.body}
                              </span>
                            ) : (
                              "Start a conversation"
                            )}
                          </div>
                        )}
                      </Link>
                    </TooltipTrigger>
                    {!isCollapsed && (
                      <TooltipContent
                        side="right"
                        className="flex items-center gap-4"
                      >
                        {otherUser.name}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              ) : (
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
                      src={otherUser.image || DefaultPfp}
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
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
