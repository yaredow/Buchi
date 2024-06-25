"use client";

import BreedCard from "@/components/breed/breed-card";
import useDogDirectory from "@/utils/hook/useDogDirectory";
import { nanoid } from "@reduxjs/toolkit";

type BreedProps = {
  breedName: string;
  breedImages: string[];
  breedShortDescription: string;
};

function BreedGrid() {
  const { dogBreeds } = useDogDirectory();
  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
      {dogBreeds.map(
        ({ breedName, breedImages, breedShortDescription }: BreedProps) => (
          <div key={nanoid()} className="w-full">
            <BreedCard
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
