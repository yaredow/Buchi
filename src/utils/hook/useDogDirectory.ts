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

  const getBreedById = (breedId: number): DogBreed | undefined => {
    return dogBreeds.find((breed) => breed.id === breedId);
  };

  return {
    dogBreeds,
    setNewDogBreeds,
    getBreedById,
  };
};

export default useDogDirectory;
