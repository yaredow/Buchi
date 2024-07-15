import Conversation from "@/components/conversation/ conversation";
import { getCurrentUser } from "@/data/user";

export default async function Page({
  params,
}: {
  params: { conversationId: string };
}) {
  const { conversationId } = params;
  const currentUser = await getCurrentUser();
  const currentUserId = currentUser?.id as string;

  return (
    <div className="w-full">
      <Conversation
        currentUserId={currentUserId}
        conversationId={conversationId}
      />
    </div>
  );
}
