"use client";

import MessageInputForm from "../form/message-input-form";

export default function MessageInput({
  conversationId,
}: {
  conversationId: string;
}) {
  return <MessageInputForm conversationId={conversationId} />;
}
