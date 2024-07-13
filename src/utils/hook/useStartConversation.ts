import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { string } from "zod";

const startConversation = async (userId: string) => {
  const response = await fetch("http://localhost:3000/api/conversations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    throw new Error("Failed to start conversation");
  }

  const data = await response.json();

  return data;
};

export default function useStartConversation() {
  const router = useRouter();
  const { isPending, mutate: converse } = useMutation({
    mutationFn: startConversation,
    mutationKey: ["conversation"],
    onSuccess: (data) => {
      router.push(`/conversations/${data.conversation.id}`);
    },
  });

  return { converse, isPending };
}
