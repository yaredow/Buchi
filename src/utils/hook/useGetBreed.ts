import { selectBreed } from "@/store/breedSlice/breedSlice";
import { useAppSelector } from "@/store/hooks";
import { useState } from "react";
import { DogBreed } from "@/../../types/breed";

export default function useGetBreed(id: number) {
  const breedData = useAppSelector(selectBreed(id)) as DogBreed;
  console.log(breedData);

  const [dogBreed, setDogBreed] = useState<DogBreed>(breedData);

  return { dogBreed };
}
