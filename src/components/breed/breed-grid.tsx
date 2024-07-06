"use client";

import BreedCard from "@/components/breed/breed-card";
import useGetBreeds from "@/utils/hook/useGetBreeds";
import { Breed } from "@prisma/client";
import { nanoid } from "@reduxjs/toolkit";
import Spinner from "../Spinner";

type BreedProps = {
  id: string;
  breedName: string;
  breedImages: string[];
  breedShortDescription: string;
};

function BreedGrid() {
  const { breeds, isFetching }: { breeds: Breed[]; isFetching: boolean } =
    useGetBreeds();

  if (isFetching)
    return (
      <div className="grid items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
      {breeds.map(
        ({ id, breedName, breedImages, breedShortDescription }: BreedProps) => (
          <div key={nanoid()} className="w-full">
            <BreedCard
              id={id}
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
