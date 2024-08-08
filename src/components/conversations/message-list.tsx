"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import ConversationBottombar from "./conversation-bottom-bar";
import { User } from "@prisma/client";
import { pusherClient } from "@/utils/pusher";
import { find } from "lodash";
import MessageItem from "./message-item";
import { FullMessageType } from "@/types/conversation";

interface ChatListProps {
  messages: FullMessageType[];
  selectedUser: User;
  currentUser: User;
  conversationId: string;
}

export default function MessageList({
  messages: initialMessages,
  conversationId,
  selectedUser,
  currentUser,
}: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<FullMessageType[]>(initialMessages);

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

            return (
              <MessageItem
                key={index}
                message={message}
                currentUser={currentUser}
                selectedUser={selectedUser}
                isLast={isLast}
              />
            );
          })}
        </AnimatePresence>
      </div>
      <ConversationBottombar conversationId={conversationId} />
    </div>
  );
}
