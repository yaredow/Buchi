import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Info, Phone, Video } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import DefaultPfp from "@/../public/images/Default_pfp.svg";
import { User } from "@prisma/client";
import { getInitials } from "@/lib/formatName";

interface ChatTopbarProps {
  selectedUser: User[];
  currentUserId: string;
}

export const TopbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }];

export default function ConversationTopbar({
  selectedUser,
  currentUserId,
}: ChatTopbarProps) {
  const otherUser = selectedUser.find((user) => user.id !== currentUserId);
  return (
    <div className="flex h-20 w-full items-center justify-between border-b p-4">
      <div className="flex items-center gap-2">
        <Avatar className="">
          <AvatarImage src={otherUser?.image} />
          <AvatarFallback>{getInitials(otherUser?.name || "")}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{otherUser?.name}</span>
          <span className="text-xs">Active 2 mins ago</span>
        </div>
      </div>

      <div className="flex flex-row gap-2">
        {TopbarIcons.map((icon, index) => (
          <Link
            key={index}
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
            )}
          >
            <icon.icon size={20} className="text-muted-foreground" />
          </Link>
        ))}
      </div>
    </div>
  );
}
