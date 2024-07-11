import EmptyState from "@/components/empty-chat";
import { Input } from "@/components/ui/input";
import { getConversationById } from "@/data/conversations";
import { getMessages } from "@/data/message";
import { MicIcon, PaperclipIcon, SmileIcon } from "lucide-react";

export default async function Page({
  params,
}: {
  params: { conversationId: string };
}) {
  const { conversationId } = params;
  const conversation = await getConversationById(conversationId);
  const messages = await getMessages(conversationId);

  if (!conversation) return <EmptyState />;

  return <div>Chat</div>;
}
