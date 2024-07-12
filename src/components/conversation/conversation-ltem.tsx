import Link from "next/link";

export default function ConversationItem({
  conversation,
}: {
  conversation: any;
}) {
  return (
    <Link href={`/conversations/${conversation.id}`}>
      <div className="cursor-pointer border-b border-gray-300 p-4 hover:bg-gray-100">
        {conversation.name}
      </div>
    </Link>
  );
}
