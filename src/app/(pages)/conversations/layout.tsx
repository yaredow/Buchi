import ConversationSidebar from "@/components/conversation-side-bar";
import ConversationItemSkeleton from "@/components/skeletons/conversation-item-skeleton";
import { getConversations } from "@/data/conversations";
import { Suspense } from "react";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();

  if (!conversations) return null;

  return (
    <div className="flex h-full rounded-lg border md:mx-6">
      <ConversationSidebar conversations={conversations} />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
