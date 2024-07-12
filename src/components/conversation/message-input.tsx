import React, { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const MessageInput = ({ onSendMessage }: { onSendMessage: any }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center border-t border-gray-300 p-4">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        rows={1}
      />
      <Button onClick={handleSendMessage}>Send</Button>
    </div>
  );
};

export default MessageInput;
