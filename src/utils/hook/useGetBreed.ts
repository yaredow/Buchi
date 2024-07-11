import { useQuery } from "@tanstack/react-query";

const fetchBreed = async (slug: string) => {
  const response = await fetch(`/api/breed/${slug}`);
  const data = await response.json();

  return data.breed;
};

export default function useGetBreed(slug: string) {
  const { data: breed, isFetching } = useQuery({
    queryKey: ["breed", slug],
    queryFn: () => fetchBreed(slug),
  });

  return { breed, isFetching };
}
