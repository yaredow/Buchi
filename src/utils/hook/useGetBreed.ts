import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBreed = async (slug: string) => {
  console.log(slug);
  const { data } = await axios.get(`http://localhost:3000/api/breed/${slug}`);
  console.log(data);

  return data.breed;
};

export default function useGetBreed(slug: string) {
  const { data: breed, isFetching } = useQuery({
    queryKey: ["breed", slug],
    queryFn: () => fetchBreed(slug),
  });

  return { breed, isFetching };
}
