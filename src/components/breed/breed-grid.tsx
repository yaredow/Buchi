"use client";

import BreedCard from "@/components/breed/breed-card";
import useDogDirectory from "@/utils/hook/useDogDirectory";
import { nanoid } from "@reduxjs/toolkit";

type BreedProps = {
  id: number;
  breedName: string;
  breedImages: string[];
  breedShortDescription: string;
};

function BreedGrid() {
  const { dogBreeds } = useDogDirectory();
  console.log(dogBreeds);
  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
      {dogBreeds.map(
        ({ id, breedName, breedImages, breedShortDescription }: BreedProps) => (
          <div key={nanoid()} className="w-full">
            <BreedCard
              breedId={id}
              breedName={breedName}
              breedImages={breedImages}
              breedShortDescription={breedShortDescription}
            />
          </div>
        ),
      )}
    </div>
  );
}

export default BreedGrid;
