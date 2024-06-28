import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const startChat = async () => {
  const { data } = await axios.post("http://localhost:3000/api/conversations");

  return data;
};

export default function useStartConversation() {
  const router = useRouter();
  const { isPending, mutate: chat } = useMutation({
    mutationFn: startChat,
    mutationKey: ["chat"],
    onSuccess: (data) => {
      router.push(`/conversations/${data.conversation.id}`);
    },
  });

  return { chat, isPending };
}
