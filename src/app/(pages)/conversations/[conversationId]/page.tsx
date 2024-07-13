"use client";

import Conversation from "@/components/conversation/ conversation";

export default function Page({
  params,
}: {
  params: { conversationId: string };
}) {
  const { conversationId } = params;

  return (
    <div className="w-full">
      <Conversation conversationId={conversationId} />
    </div>
  );
}
