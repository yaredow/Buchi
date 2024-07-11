import { useQuery } from "@tanstack/react-query";

const fetchUser = async (userId: string) => {
  const response = await fetch(`/api/user/${userId}`);
  const data = await response.json();
  return data.user;
};

export default function useGetUser(userId: string) {
  const { data: user, isFetching } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  });

  return { user, isFetching };
}
