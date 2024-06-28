import breedData from "@/utils/breed-data/data.json";
import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { DogBreed } from "@/../types/breed/index";
import { selectBreeds } from "@/store/breedSlice/breedSlice";

const useDogDirectory = () => {
  const breedData = useAppSelector(selectBreeds);

  const [dogBreeds, setDogBreeds] = useState<DogBreed[]>(breedData);

  const setNewDogBreeds = (dogBreeds: DogBreed[]) => {
    setDogBreeds(dogBreeds);
  };

  return {
    dogBreeds,
    setNewDogBreeds,
  };
};

export default useDogDirectory;
