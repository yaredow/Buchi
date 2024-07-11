import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBreeds = async () => {
  const responsoe = await fetch("/api/breed");
  const data = await responsoe.json();

  return data.breeds;
};

export default function useGetBreeds() {
  const { data: breeds, isFetching } = useQuery({
    queryKey: ["breeds"],
    queryFn: fetchBreeds,
  });

  return { breeds, isFetching };
}
