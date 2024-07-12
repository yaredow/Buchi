import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDate } from "@/lib/helpers";

export default function ConversationItem({
  conversation,
}: {
  conversation: any;
}) {
  const { messages, users, lastMessageAt, lastMessage } = conversation;

  return (
    <Link href={`/conversations/${conversation.id}`}>
      <div className="group flex items-center gap-4 rounded-lg p-4 transition-colors hover:bg-muted">
        <Avatar className="h-12 w-12 border">
          <AvatarImage src={users[0].image} alt={users[0].name} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="grid flex-1 gap-1">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="font-medium group-hover:text-slate-800">
                {users[0].name}
              </div>
              <div className="text-sm text-muted-foreground">
                {`@${users[0].username}`}
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              {formatDate(lastMessageAt)}
            </div>
          </div>
          <div className="line-clamp-1 text-sm text-muted-foreground">
            {lastMessage}
          </div>
        </div>
      </div>
    </Link>
  );
}
