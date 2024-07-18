"use client";

import Link from "next/link";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import ConversationList from "./conversations/conversation-list";

export function Sidebar() {
  return (
    <div className="relative flex h-full flex-col gap-4 p-2">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-2 text-2xl">
          <p className="font-medium">Chats</p>
          <span className="text-zinc-300">(number of conversations)</span>
        </div>

        <div>
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
            )}
          >
            <MoreHorizontal size={20} />
          </Link>

          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
            )}
          >
            <SquarePen size={20} />
          </Link>
        </div>
      </div>

      <ConversationList />
    </div>
  );
}
