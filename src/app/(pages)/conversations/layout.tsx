import ConversationSidebar from "@/components/conversation-side-bar";
import { getConversations } from "@/data/conversations";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();

  if (!conversations) return null;

  return (
    <div className="flex h-full rounded-lg md:mx-6 md:border">
      <ConversationSidebar conversations={conversations} />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
