import { Message } from "@prisma/client";
import MessageItem from "@/components/conversation/ message-item";

type MessageListProps = {
  messages: Message[];
};

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex flex-grow flex-col overflow-y-auto p-4">
      <div className="flex flex-col space-y-4">
        {messages.map((message: any, index: number) => (
          <MessageItem key={index} message={message} />
        ))}
      </div>
    </div>
  );
}
