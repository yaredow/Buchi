import { useQuery } from "@tanstack/react-query";

const fetchConversations = async () => {
  const response = await fetch("/api/conversations", {
    method: "GET",
  });

  const data = await response.json();

  return data;
};

export default function useGetConversations() {
  const { data: conversations, isPending } = useQuery({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
  });

  return { isPending, conversations };
}
