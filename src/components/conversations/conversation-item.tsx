import { Conversation, User, Message } from "@prisma/client";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface ConversationItemProps {
  currentUserId: string;
  conversation: Conversation & {
    users: User[];
    messages: Message[];
  };
}

export default function ConversationItem({
  conversation,
  currentUserId,
}: ConversationItemProps) {
  const { users, messages } = conversation;
  const otherUser = users.find((user) => user.id !== currentUserId);
  const lastMessage = messages[messages.length - 1];

  return (
    <Link
      href={`/chat/${conversation.id}`}
      className={cn(
        buttonVariants({ variant: "ghost", size: "lg" }),
        "shrink dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
        "justify-start gap-4",
      )}
    >
      <Avatar className="flex items-center justify-center">
        <AvatarImage
          src={otherUser?.image || "/default-avatar.png"}
          alt={otherUser?.name || ""}
          width={6}
          height={6}
          className="h-10 w-10"
        />
      </Avatar>
      <div className="flex max-w-28 flex-col">
        <span>{otherUser?.name}</span>
        {lastMessage && (
          <span className="truncate text-xs text-zinc-300">
            {lastMessage.body}
          </span>
        )}
      </div>
    </Link>
  );
}
