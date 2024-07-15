"use client";

import Conversation from "@/components/conversation/ conversation";

export default function Page({
  params,
}: {
  params: { conversationId: string };
}) {
  const { conversationId } = params;
  console.log(conversationId);

  return (
    <div className="w-full">
      <Conversation conversationId={conversationId} />
    </div>
  );
}
