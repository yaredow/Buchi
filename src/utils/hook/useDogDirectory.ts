import breedData from "@/utils/breed-data/data.json";
import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { DogBreed } from "@/../types/breed/index";

const useDogDirectory = () => {
  const breedData = useAppSelector((state) => state.breeds.breeds);

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
