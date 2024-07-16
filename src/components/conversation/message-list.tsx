import { Message } from "@prisma/client";
import MessageItem from "@/components/conversation/ message-item";

type MessageListProps = {
  messages: Message[];
};

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div>
      {messages.map((message: any, index: number) => (
        <MessageItem key={index} message={message} />
      ))}
    </div>
  );
}
