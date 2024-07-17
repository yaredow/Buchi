"use client";

import Link from "next/link";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@/app/data";

interface SidebarProps {
  links: {
    name: string;
    messages: Message[];
    avatar: string;
    variant: "grey" | "ghost";
  }[];
  isMobile: boolean;
}

export default function SideBar({ links, isMobile }: SidebarProps) {
  return (
    <div className="group relative flex h-full flex-col gap-4 border-r p-2">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-2 text-2xl">
          <p className="font-medium">Chats</p>
          <span className="text-zinc-300">({links.length})</span>
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

      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => (
          <Link
            key={index}
            href="#"
            className={cn(
              buttonVariants({ variant: link.variant, size: "lg" }),
              link.variant === "grey" &&
                "shrink dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
              "justify-start gap-4",
            )}
          >
            <Avatar className="flex items-center justify-center">
              <AvatarImage
                src={link.avatar}
                alt={link.avatar}
                width={6}
                height={6}
                className="h-10 w-10"
              />
            </Avatar>
            <div className="flex max-w-28 flex-col">
              <span>{link.name}</span>
              {link.messages.length > 0 && (
                <span className="truncate text-xs text-zinc-300">
                  {link.messages[link.messages.length - 1].name.split(" ")[0]}:{" "}
                  {link.messages[link.messages.length - 1].message}
                </span>
              )}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}
