import { useQuery } from "@tanstack/react-query";

const fetchConveration = async (conversationId: string) => {
  const response = await fetch(
    `/api/conversations/conversation/${conversationId}`,
  );
  const data = await response.json();

  console.log(data);

  return data;
};

export default function useGetConversation(conversationId: string) {
  const { data: conversation, isFetching } = useQuery({
    queryKey: ["conversation"],
    queryFn: () => fetchConveration(conversationId),
  });

  return { conversation, isFetching };
}
