"use client";

import Conversation from "@/components/conversation/ conversation";

export default function Page({
  params,
}: {
  params: { conversationId: string };
}) {
  const { conversationId } = params;

  return (
    <div className="md:w-2/3">
      <Conversation conversationId={conversationId} />
    </div>
  );
}
