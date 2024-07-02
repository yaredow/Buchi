import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchAllUsers() {
  const { data } = await axios.get("http://localhost:3000/api/user");

  console.log(data);

  return data.users;
}

export default function useGetAllUsers() {
  const { data: users, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  });

  console.log(users);

  return { users, isPending };
}
