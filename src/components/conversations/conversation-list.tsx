"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AnimatePresence, motion } from "framer-motion";
import ConversationBottombar from "./conversation-bottom-bar";
import { Message, User } from "@prisma/client";
import DefaultPfp from "@/../public/images/Default_pfp.svg";
import Image from "next/image";
import { formatDate } from "@/lib/helpers";
import { pusherClient } from "@/utils/pusher";
import { find } from "lodash";
import { CheckCheck } from "lucide-react";

type FullMessageType = Message & {
  sender: User;
  seen: User;
};

interface ChatListProps {
  messages: FullMessageType[];
  selectedUser: User;
  currentUser: User;
  conversationId: string;
}

export default function ConversationList({
  messages: initialMessages,
  conversationId,
  selectedUser,
  currentUser,
}: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    fetch(`/api/conversations/${conversationId}/seen`, { method: "POST" });
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);

    const messageHandler = (newMessage: FullMessageType) => {
      setMessages((prevMessage) => {
        if (find(prevMessage, { id: newMessage.id })) {
          return prevMessage;
        }

        return [...prevMessage, newMessage];
      });
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        }),
      );
    };

    pusherClient.bind("message:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("message:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  });

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden">
      <div
        ref={messagesContainerRef}
        className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden"
      >
        <AnimatePresence>
          {messages?.map((message, index) => {
            const isLast = index === messages.length - 1;
            const isMessageFromCurrentUser =
              message.senderId === currentUser.id;
            const isMessageSeenByOtherUser = message.seenIds.includes(
              selectedUser.id,
            );

            console.log(isMessageSeenByOtherUser);

            return (
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
                  isMessageFromCurrentUser ? "items-end" : "items-start",
                )}
              >
                <div className="flex items-center gap-3">
                  {!isMessageFromCurrentUser && (
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
                    <div className="flex flex-col gap-2">
                      <span className="max-w-xs rounded-md bg-accent p-3">
                        {message.body}
                      </span>
                      <div className="flex flex-row items-center justify-between">
                        <span className="text-xs">
                          {formatDate(message.createdAt).split(",")[1]}
                        </span>

                        {isLast &&
                          isMessageFromCurrentUser &&
                          isMessageSeenByOtherUser && (
                            <span className="text-xs">
                              <CheckCheck size={16} />
                            </span>
                          )}
                      </div>
                    </div>
                  ) : (
                    message.image && (
                      <div className="relative aspect-square h-48">
                        <Image
                          src={message.image}
                          alt={message.id}
                          fill
                          className="border-primary-800 border-r object-cover"
                        />
                      </div>
                    )
                  )}

                  {isMessageFromCurrentUser && (
                    <Avatar className="flex items-center justify-center">
                      <AvatarImage
                        src={currentUser.image || DefaultPfp.src}
                        alt={currentUser.name || ""}
                        width={6}
                        height={6}
                      />
                    </Avatar>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <ConversationBottombar conversationId={conversationId} />
    </div>
  );
}
