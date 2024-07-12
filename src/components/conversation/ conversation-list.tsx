import ConversationItem from "./conversation-ltem";

const conversations = [
  { id: "1", name: "Conversation 1" },
  { id: "2", name: "Conversation 2" },
];

export default function ConversationList() {
  return (
    <main className="p-4">
      {conversations.map((conversation) => (
        <ConversationItem key={conversation.id} conversation={conversation} />
      ))}
    </main>
  );
}
