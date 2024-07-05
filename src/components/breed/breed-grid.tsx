"use client";

import BreedCard from "@/components/breed/breed-card";
import { Breed } from "@prisma/client";
import { nanoid } from "@reduxjs/toolkit";

type BreedProps = {
  slug: string;
  breedName: string;
  breedImages: string[];
  breedShortDescription: string;
};

function BreedGrid({ breeds }: { breeds: Breed[] }) {
  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
      {breeds.map(
        ({
          slug,
          breedName,
          breedImages,
          breedShortDescription,
        }: BreedProps) => (
          <div key={nanoid()} className="w-full">
            <BreedCard
              slug={slug}
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
