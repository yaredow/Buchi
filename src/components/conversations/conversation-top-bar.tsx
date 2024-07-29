import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { User } from "@prisma/client";
import DefaultPfp from "@/../public/images/Default_pfp.svg";
import ConversationDrawer from "./conversation-drawer";

interface ChatTopbarProps {
  selectedUser: User;
  conversationId: string;
}

export default function ConversationTopbar({
  selectedUser,
  conversationId,
}: ChatTopbarProps) {
  return (
    <div className="flex h-20 w-full items-center justify-between border-b p-4">
      <div className="flex items-center gap-2">
        <Avatar className="flex items-center justify-center">
          <AvatarImage
            src={selectedUser.image || DefaultPfp.src}
            alt={selectedUser.name || ""}
            width={6}
            height={6}
            className="h-10 w-10"
          />
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{selectedUser.name}</span>
          <span className="text-xs">{`@${selectedUser.userName}`}</span>
        </div>
      </div>

      <div>
        <ConversationDrawer
          conversationId={conversationId}
          selectedUser={selectedUser}
        />
      </div>
    </div>
  );
}
