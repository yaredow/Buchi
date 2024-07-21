import ConversationSidebar from "@/components/conversation-side-bar";
import { getConversations } from "@/data/conversations";
import { getCurrentUser } from "@/data/user";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const currentLoggedInUser = await getCurrentUser();
  const curentLoggedInUserId = currentLoggedInUser?.id as string;

  if (!conversations) return null;

  return (
    <div className="flex h-full rounded-lg border md:mx-6">
      <ConversationSidebar
        currentLoggedInUserId={curentLoggedInUserId}
        conversations={conversations}
      />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
