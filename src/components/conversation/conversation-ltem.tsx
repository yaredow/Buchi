import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDate } from "@/lib/helpers";
import { Conversation, User } from "@prisma/client";
import { getMessages } from "@/data/message";
import { getInitials } from "@/lib/formatName";

type ConversationItemProps = {
  conversation: Conversation & {
    users: User[];
  };
  currentUserId: string;
};

export default async function ConversationItem({
  conversation,
  currentUserId,
}: ConversationItemProps) {
  const { users, lastMessageAt } = conversation;
  const otherUser = users.find((user) => user.id !== currentUserId);
  const messages = await getMessages(conversation.id);
  const lastMessage =
    messages.length > 0 ? messages[messages.length - 1] : null;

  return (
    <Link href={`/conversations/${conversation.id}`}>
      <div className="group flex items-center gap-4 rounded-lg p-4 transition-colors hover:bg-muted">
        <Avatar className="h-12 w-12 border">
          <AvatarImage
            src={otherUser?.image}
            alt={otherUser?.name || "user image"}
          />
          <AvatarFallback>{getInitials(otherUser?.name || "")}</AvatarFallback>
        </Avatar>

        <div className="grid flex-1 gap-1">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="font-medium group-hover:text-slate-800">
                {otherUser?.name}
              </div>
              <div className="text-m text-muted-foreground">
                {`@${otherUser?.userName}`}
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              {formatDate(lastMessageAt)}
            </div>
          </div>
          <div className="line-clamp-1 text-sm text-muted-foreground">
            {lastMessage ? lastMessage.body : "Start a conversation"}
          </div>
        </div>
      </div>
    </Link>
  );
}
