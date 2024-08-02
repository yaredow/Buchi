"use client";

import BreedCard from "@/components/breed/breed-card";
import { Breed } from "@prisma/client";
import { nanoid } from "@reduxjs/toolkit";

type BreedGridProps = {
  breeds: Breed[];
};

function BreedGrid({ breeds }: BreedGridProps) {
  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
      {breeds.map(({ slug, breedName, breedImages, breedShortDescription }) => (
        <div key={nanoid()} className="w-full">
          <BreedCard
            slug={slug}
            breedName={breedName}
            breedImages={breedImages}
            breedShortDescription={breedShortDescription}
          />
        </div>
      ))}
    </div>
  );
}

export default BreedGrid;
