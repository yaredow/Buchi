import { getInitials } from "@/lib/formatName";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function ConversationHeader({ users }: { users: any[] }) {
  return (
    <div className="my-auto flex w-full items-center border-b px-4 py-[10px] text-sm text-gray-500">
      <div className="flex items-center">
        <Avatar className="mr-4">
          <AvatarImage src={users[0].image} />
          <AvatarFallback>{getInitials(users[0].name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold text-foreground">{users[0].name}</span>
          <span className="text-sm text-muted-foreground">{users[0].bio}</span>
        </div>
      </div>
    </div>
  );
}
