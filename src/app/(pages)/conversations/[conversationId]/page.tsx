import { getConversationById } from "@/data/conversations";
import { getMessages } from "@/data/message";

export default async function Page({
  params,
}: {
  params: { conversationId: string };
}) {
  const { conversationId } = params;
  const conversation = await getConversationById(conversationId);
  const messages = await getMessages(conversationId);
  return <div>Enter</div>;
}
