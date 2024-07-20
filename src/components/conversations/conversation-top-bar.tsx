import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Info } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { User } from "@prisma/client";
import DefaultPfp from "@/../public/images/Default_pfp.svg";

interface ChatTopbarProps {
  selectedUser: User;
}

export default function ConversationTopbar({ selectedUser }: ChatTopbarProps) {
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
          <span className="text-xs">Active 2 mins ago</span>
        </div>
      </div>

      <div>
        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-9 w-9 items-center gap-2 rounded-full",
            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
          )}
        >
          <Info size={20} className="text-muted-foreground" />
        </Link>
      </div>
    </div>
  );
}
