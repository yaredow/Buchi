import { getInitials } from "@/lib/formatName";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "@prisma/client";

type ConversationHeaderProps = {
  users: User[];
  currentUserId: string;
};

export default function ConversationHeader({
  users,
  currentUserId,
}: ConversationHeaderProps) {
  const otherUser = users.find((user) => user.id !== currentUserId);
  return (
    <div className="my-auto flex w-full items-center border-b px-4 py-[10px] text-sm text-gray-500">
      <div className="flex items-center">
        <Avatar className="mr-4">
          <AvatarImage src={otherUser?.image} />
          <AvatarFallback>{getInitials(otherUser?.name || "")}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold text-foreground">
            {otherUser?.name}
          </span>
          <span className="text-sm text-muted-foreground">
            {otherUser?.bio}
          </span>
        </div>
      </div>
    </div>
  );
}
