import React, { useState } from "react";
import { MicIcon, PaperclipIcon, SmileIcon } from "lucide-react";
import { Input } from "../ui/input";

const MessageInput = ({
  sendMessage,
  senderId,
}: {
  sendMessage: any;
  senderId: string;
}) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message, senderId);
      setMessage("");
    }
  };

  return (
    <div className="flex w-full items-center justify-center border-t p-4">
      <SmileIcon className="mr-4 h-6 w-6" />
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message here"
        className="w-full flex-1"
      />
      <PaperclipIcon className="mx-4 h-6 w-6" />
      <MicIcon className="h-6 w-6" />
    </div>
  );
};

export default MessageInput;
