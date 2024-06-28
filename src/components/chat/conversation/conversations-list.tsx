"use client";

import useGetConversations from "@/utils/hook/useGetConversations";

export default function ConversationsList() {
  const { isPending, conversations } = useGetConversations();
  return <div>conversations list</div>;
}
