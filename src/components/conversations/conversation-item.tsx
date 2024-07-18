import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Conversation, Message, User } from "@prisma/client";
import useOtherUser from "@/utils/hook/useOtherUser";

type ConversationItemProps = {
  isCollapsed: boolean;
  conversation: Conversation & {
    users: User[];
    messages: Message[];
  };
};

export default function ConversationItem({
  isCollapsed,
  conversation,
}: ConversationItemProps) {
  const otherUser = useOtherUser(conversation);
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  return (
    <div>
      {isCollapsed ? (
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className={cn(
                  buttonVariants({ variant: link.variant, size: "icon" }),
                  "h-11 w-11 md:h-16 md:w-16",
                  link.variant === "grey" &&
                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                )}
              >
                <Avatar className="flex items-center justify-center">
                  <AvatarImage
                    src={otherUser.image}
                    alt={otherUser.name || ""}
                    width={6}
                    height={6}
                    className="h-10 w-10"
                  />
                </Avatar>{" "}
                <span className="sr-only">{otherUser.name}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              {otherUser.name}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: conversation.users.variant, size: "xl" }),
            link.variant === "grey" &&
              "shrink dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
            "justify-start gap-4",
          )}
        >
          <Avatar className="flex items-center justify-center">
            <AvatarImage
              src={otherUser.image}
              alt={otherUser.name || ""}
              width={6}
              height={6}
              className="h-10 w-10"
            />
          </Avatar>
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
        </Link>
      )}
    </div>
  );
}
