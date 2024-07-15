import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDate } from "@/lib/helpers";
import { Conversation, Message, User } from "@prisma/client";

type ConversationItemProps = {
  conversation: Conversation & {
    messages: Message[];
    users: User[];
  };
  currentUserId: string;
};

export default function ConversationItem({
  conversation,
  currentUserId,
}: ConversationItemProps) {
  const { messages, users, lastMessageAt } = conversation;
  const otherUser = users.find((user) => user.id !== currentUserId);
  console.log(messages);

  return (
    <Link href={`/conversations/${conversation.id}`}>
      <div className="group flex items-center gap-4 rounded-lg p-4 transition-colors hover:bg-muted">
        <Avatar className="h-12 w-12 border">
          <AvatarImage
            src={otherUser?.image}
            alt={otherUser?.name || "user image"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="grid flex-1 gap-1">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="font-medium group-hover:text-slate-800">
                {users[0].name}
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
            {messages[0].body || "Start a conversation"}
          </div>
        </div>
      </div>
    </Link>
  );
}
