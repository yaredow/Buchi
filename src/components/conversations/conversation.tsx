import { Message, UserData } from "@/app/data";
import React from "react";
import ConversationTopbar from "@/components/conversations/conversation-top-bar";
import ConversationList from "@/components/conversations/conversation-list";

interface ChatProps {
  messages?: Message[];
  selectedUser: UserData;
  isMobile: boolean;
}

export default function Conversation({
  messages,
  selectedUser,
  isMobile,
}: ChatProps) {
  const [messagesState, setMessages] = React.useState<Message[]>(
    messages ?? [],
  );

  const sendMessage = (newMessage: Message) => {
    setMessages([...messagesState, newMessage]);
  };

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <ConversationTopbar selectedUser={selectedUser} />

      <ConversationList
        messages={messagesState}
        selectedUser={selectedUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
