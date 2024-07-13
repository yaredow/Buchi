import { useEffect, useMemo, useState } from "react";

export default function useConversation(conversationId: string) {
  const [conversation, setConversation] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchConversation = async () => {
      setIsLoading(true);
      const response = await fetch("/data/dummyConvo.json");
      const data = await response.json();
      const conv = data.find((c: any) => c.id === conversationId);
      setConversation(conv);
      setIsLoading(false);
    };

    fetchConversation();
  }, [conversationId]);

  const sendMessage = (body: string, senderId: string) => {
    const newMessage = {
      id: `m${conversation.messages.length + 1}`,
      body,
      createdAt: new Date().toISOString(),
      senderId,
    };

    setConversation((prevConv: any) => ({
      ...prevConv,
      messages: [...prevConv.messages, newMessage],
    }));
  };

  return { conversation, sendMessage };
}
