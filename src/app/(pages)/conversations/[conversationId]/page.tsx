import { auth } from "@/auth";
import EmptyState from "@/components/empty-chat";
import { getConversationById } from "@/data/conversations";
import { getMessages } from "@/data/message";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { conversationId: string };
}) {
  const { conversationId } = params;
  const session = await auth();
  const conversation = await getConversationById(conversationId);
  const messages = await getMessages(conversationId);

  if (!session) redirect("/auth/signin");

  if (!conversation) return <EmptyState />;

  return <div className="md:w-1/4">Chat</div>;
}
