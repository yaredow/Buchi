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
} from "@/components/ui/alert-dialog";
import { User } from "@prisma/client";
import DefaultPfp from "@/../public/images/Default_pfp.svg";
import { getInitials } from "@/lib/formatName";
import { formatDate } from "@/lib/helpers";
import ConversationDrawerContent from "./conversation-drawer-content";

type ConversationDropdownMenuProps = {
  selectedUser: User;
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function ConversationDropdownMenu({
  selectedUser,
  onDelete,
}: ConversationDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        drawerRef.current &&
        !drawerRef.current.contains(target) &&
        !(
          target.closest(".alert-dialog-content") ||
          target.closest(".alert-dialog-trigger")
        )
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          className="absolute right-0 top-0 z-50 w-[350px] rounded-t-lg border bg-background shadow-lg md:w-full md:p-6"
        >
          <div className="text-end">
            <button onClick={toggleDrawer}>
              <X size={20} />
            </button>
          </div>

          <ConversationDrawerContent
            onDelete={onDelete}
            selectedUser={selectedUser}
          />
        </div>
      )}
    </div>
  );
}
