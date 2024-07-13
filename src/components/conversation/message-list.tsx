import MessageItem from "./ message-item";

export default function MessageList({ messages }: { messages: any }) {
  return (
    <div>
      {messages.map((message: any, index: number) => (
        <MessageItem key={index} message={message} />
      ))}
    </div>
  );
}
