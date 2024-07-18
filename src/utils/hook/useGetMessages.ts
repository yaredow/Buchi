import { useQuery } from "@tanstack/react-query";

const fetchMessages = async (conversationId: string) => {
  const response = await fetch(`/api/message/${conversationId}`);

  const data = await response.json();

  return data;
};

export default function useGetMessages(conversationId: string) {
  const { data: messages, isFetching } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => fetchMessages(conversationId),
    enabled: !!conversationId,
  });

  return { messages, isFetching };
}
