import { useQuery } from "@tanstack/react-query";

const fetchConversation = async (conversationId: string) => {
  const response = await fetch(
    `/api/conversations/conversation/${conversationId}`,
  );
  const data = await response.json();

  console.log(data);

  return data;
};

export default function useGetBreed(conversationId: string) {
  const { data: conversation, isFetching } = useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: () => fetchConversation(conversationId),
  });

  console.log(conversation);

  return { conversation, isFetching };
}
