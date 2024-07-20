"use client";

import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AnimatePresence, motion } from "framer-motion";
import ConversationBottombar from "@/components/conversations/conversation-bottom-bar";
import { Message, User } from "@prisma/client";
import DefaultPfp from "@/../public/images/Default_pfp.svg";
import Image from "next/image";

interface ChatListProps {
  messages?: Message[];
  selectedUser: User;
}

export default function ConversationList({
  messages,
  selectedUser,
}: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);
  console.log(messages);

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden">
      <div
        ref={messagesContainerRef}
        className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden"
      >
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 whitespace-pre-wrap p-4",
                message.senderId !== selectedUser.id
                  ? "items-end"
                  : "items-start",
              )}
            >
              <div className="flex items-center gap-3">
                {message.senderId === selectedUser.id && (
                  <Avatar className="flex items-center justify-center">
                    <AvatarImage
                      src={selectedUser.image || DefaultPfp}
                      alt={selectedUser.name || ""}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
                {message.body ? (
                  <span className="max-w-xs rounded-md bg-accent p-3">
                    {message.body}
                  </span>
                ) : (
                  message.image && (
                    <div className="">
                      <Image
                        src={message.image}
                        alt="User sent image"
                        fill
                        className="max-w-xs rounded-md"
                      />
                    </div>
                  )
                )}
                {message.senderId !== selectedUser.id && (
                  <Avatar className="flex items-center justify-center">
                    <AvatarImage
                      src={selectedUser.image || DefaultPfp}
                      alt={selectedUser.name || ""}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <ConversationBottombar />
    </div>
  );
}
