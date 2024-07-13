import React, { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { MicIcon, PaperclipIcon, SmileIcon } from "lucide-react";
import { Input } from "../ui/input";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  return (
    <div className="flex w-full items-center border-t p-4">
      <SmileIcon className="mr-4 h-6 w-6" />
      <Input placeholder="Write your message here" className="flex-1" />
      <PaperclipIcon className="mx-4 h-6 w-6" />
      <MicIcon className="h-6 w-6" />
    </div>
  );
};

export default MessageInput;
