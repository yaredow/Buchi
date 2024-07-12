import { useMemo, useState } from "react";

export default function useConversation(conversationId: string) {
  const [conversation, setConversation] = useState([]);

  useMemo(async () => {
    const fetchConversation = async () => {
      const response = await fetch("/data/dummyConvo.json");
      const data = await response.json();
      const conv = data.find((c: any) => c.id === conversationId);
      setConversation(conv);
    };

    fetchConversation();
  }, [conversationId]);

  return conversation;
}
