import { useQuery } from "@tanstack/react-query";

const fetchConversation = async (conversationId: string) => {
  const response = await fetch(
    `/api/conversations/conversation/${conversationId}`,
  );
  const data = await response.json();

  return data;
};

export default function useGetBreed(conversationId: string) {
  const { data: conversation, isFetching } = useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: () => fetchConversation(conversationId),
  });

  return { conversation, isFetching };
}
