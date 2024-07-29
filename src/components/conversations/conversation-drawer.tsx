"use client";

import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, Ellipsis } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TrashIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";

type ConversationDropdownMenuProps = {
  conversationId: string;
};

export default function ConversationDropdownMenu({
  conversationId,
}: ConversationDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (drawerRef.current && !drawerRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleConversationDelete = async () => {
    await fetch(`/api/conversations/${conversationId}`, {
      method: "DELETE",
    });
  };

  return (
    <div className="relative">
      <Button
        onClick={toggleDrawer}
        variant="outline"
        size="icon"
        className="rounded-full"
      >
        <Ellipsis />
        <span className="sr-only">Toggle profile drawer</span>
      </Button>

      {isOpen && (
        <div
          ref={drawerRef}
          className="absolute right-0 top-0 z-50 w-full rounded-t-lg border bg-background p-6 shadow-lg sm:w-[350px]"
        >
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <div className="text-xl font-bold">John Doe</div>
              <div className="text-sm text-muted-foreground">@johndoe</div>
            </div>
            <div className="text-sm text-muted-foreground">
              Hi there! I&apos;m a software engineer and I love to code.
            </div>
          </div>
          <div className="mt-6 grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-muted-foreground" />
              <div>Last seen 2 hours ago</div>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <div>Joined June 2023</div>
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary"
              prefetch={false}
            >
              <TwitterLogoIcon className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary"
              prefetch={false}
            >
              <InstagramLogoIcon className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary"
              prefetch={false}
            >
              <GitHubLogoIcon className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary"
              prefetch={false}
            >
              <LinkedInLogoIcon className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
          <div className="mt-6 flex justify-end">
            <Button variant="destructive">
              <TrashIcon className="mr-2 h-4 w-4" />
              Delete Conversation
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
