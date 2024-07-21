"use client";

import {
  FileImage,
  Mic,
  PlusCircle,
  SendHorizontal,
  ThumbsUp,
} from "lucide-react";

import React, { useRef, useState, useTransition } from "react";
import { Button } from "../ui/button";

import { AnimatePresence, motion } from "framer-motion";
import { Textarea } from "../ui/textarea";
import { EmojiPicker } from "../emoji-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type ConversationBottombarProps = {
  conversationId: string;
};

export const BottombarIcons = [{ icon: FileImage }, { icon: Mic }];

export default function ConversationBottombar({
  conversationId,
}: ConversationBottombarProps) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const image = event.target.files?.[0];

    if (image) {
      const formdata = new FormData();
      formdata.append("image", image);
      formdata.append("conversationId", conversationId);

      await fetch("/api/messages", {
        method: "POST",
        body: formdata,
      });
    }
  };

  const handleThumbsUp = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({
          body: "👍",
          conversationId,
          image: null,
        }),
      });
      if (response.ok) {
        setMessage("");
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("body", message.trim());
    formData.append("conversationId", conversationId);

    try {
      if (message.trim()) {
        const response = await fetch("/api/messages", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          setMessage("");
        }

        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  return (
    <div className="flex w-full items-center justify-between gap-2 p-2">
      <div className="flex">
        {message.trim() ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <PlusCircle size={20} className="text-muted-foreground" />
              </Button>
            </PopoverTrigger>

            <PopoverContent side="top" className="w-full p-2">
              {message.trim() ? (
                <div className="flex flex-row space-x-2 rounded-full border">
                  {BottombarIcons.map((icon, index) => (
                    <Button
                      onClick={
                        icon.icon === FileImage
                          ? handleFileInputClick
                          : undefined
                      }
                      key={index}
                      variant="ghost"
                      size="icon"
                    >
                      <icon.icon size={20} className="text-muted-foreground" />
                    </Button>
                  ))}
                </div>
              ) : (
                <Button variant="ghost" size="icon" className="h-g w-9">
                  <Mic size={20} className="text-muted-foreground" />
                </Button>
              )}
            </PopoverContent>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileInputChange}
            />
          </Popover>
        ) : (
          <div className="flex">
            {BottombarIcons.map((icon, index) => (
              <Button
                onClick={
                  icon.icon === FileImage ? handleFileInputClick : undefined
                }
                variant="ghost"
                size="icon"
                key={index}
              >
                <icon.icon size={20} className="text-muted-foreground" />
              </Button>
            ))}
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileInputChange}
        />
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          key="input"
          className="relative w-full"
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: "spring",
              bounce: 0.15,
            },
          }}
        >
          <Textarea
            autoComplete="off"
            value={message}
            disabled={isLoading}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            name="message"
            placeholder="Aa"
            className="flex h-9 w-full resize-none items-center overflow-hidden rounded-full border bg-background"
          ></Textarea>
          <div className="absolute bottom-0.5 right-2">
            <EmojiPicker
              onChange={(value) => {
                setMessage(message + value);
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
            />
          </div>
        </motion.div>

        {message.trim() ? (
          <Button variant="ghost" size="icon" onClick={handleSend}>
            <SendHorizontal size={20} className="text-muted-foreground" />
          </Button>
        ) : (
          <Button variant="ghost" size="icon" onClick={handleThumbsUp}>
            <ThumbsUp size={20} className="text-muted-foreground" />
          </Button>
        )}
      </AnimatePresence>
    </div>
  );
}
