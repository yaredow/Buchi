"use client";

import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, Ellipsis, Trash, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { User } from "@prisma/client";
import DefaultPfp from "@/../public/images/Default_pfp.svg";
import { getInitials } from "@/lib/formatName";
import { formatDate } from "@/lib/helpers";

type ConversationDropdownMenuProps = {
  selectedUser: User;
  conversationId: string;
};

export default function ConversationDropdownMenu({
  conversationId,
  selectedUser,
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
          <div className="text-end">
            <button onClick={toggleDrawer}>
              <X size={20} />
            </button>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={selectedUser.image || DefaultPfp.src} />
              <AvatarFallback>
                {getInitials(selectedUser.name || "")}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <div className="text-xl font-bold">{selectedUser.name}</div>
              <div className="text-sm text-muted-foreground">{`@${selectedUser.userName}`}</div>
            </div>
            <div className="text-sm text-muted-foreground">
              {selectedUser.bio ? selectedUser.bio : "No bio available"}
            </div>
          </div>
          <div className="mt-6 grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-muted-foreground" />
              <div>Last seen 2 hours ago</div>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <div>{formatDate(selectedUser.createdAt)}</div>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost">
                  <Trash size={20} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the conversation and remove all messages from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleConversationDelete}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
    </div>
  );
}
