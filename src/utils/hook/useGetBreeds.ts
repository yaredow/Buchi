import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBreeds = async () => {
  const { data } = await axios.get("http://localhost:3000/api/breed");
  console.log(data);

  return data.breeds;
};

export default function useGetBreeds() {
  const { data: breeds, isFetching } = useQuery({
    queryKey: ["breeds"],
    queryFn: fetchBreeds,
  });

  return { breeds, isFetching };
}
