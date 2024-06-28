import { getConversations } from "@/data/conversations";
import { useQuery } from "@tanstack/react-query";

export default function useGetConversations() {
  const { data: conversations, isPending } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
  });

  return { isPending, conversations };
}
