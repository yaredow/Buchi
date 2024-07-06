import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBreed = async (slug: string) => {
  const { data } = await axios.get(`http:/localhost:3000/api/breed/${slug}`);

  return data.breed;
};

export default function useGetBreed(slug: string) {
  const { data: breed, isPending } = useQuery({
    queryKey: ["breed", slug],
    queryFn: () => fetchBreed(slug),
  });

  return { breed, isPending };
}
