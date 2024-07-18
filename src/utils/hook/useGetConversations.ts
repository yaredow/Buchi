import { useQuery } from "@tanstack/react-query";

const fetchConversations = async () => {
  const response = await fetch("/api/conversations");
};

export default function useGetConversations() {
  const { data: conversations, isPending } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
  });

  return { isPending, conversations };
}
