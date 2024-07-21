import {
  FileImage,
  Mic,
  PlusCircle,
  SendHorizontal,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
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
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleThumbsUp = async () => {
    await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({
        body: "👍",
        conversationId,
        image: null,
      }),
    });

    setMessage("");
  };

  const handleSend = async () => {
    if (message.trim()) {
      await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({
          body: message.trim(),
          conversationId,
          image: null,
        }),
      });
      setMessage("");

      if (inputRef.current) {
        inputRef.current.focus();
      }
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
                    <Button key={index} variant="ghost" size="icon">
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
          </Popover>
        ) : (
          <div className="flex">
            {BottombarIcons.map((icon, index) => (
              <Button variant="ghost" size="icon" key={index}>
                <icon.icon size={20} className="text-muted-foreground" />
              </Button>
            ))}
          </div>
        )}
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
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9 rounded-full",
              "shrink-0 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
            )}
            onClick={handleSend}
          >
            <SendHorizontal size={20} className="text-muted-foreground" />
          </Link>
        ) : (
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9 rounded-full",
              "shrink-0 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
            )}
            onClick={handleThumbsUp}
          >
            <ThumbsUp size={20} className="text-muted-foreground" />
          </Link>
        )}
      </AnimatePresence>
    </div>
  );
}
