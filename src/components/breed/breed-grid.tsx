"use client";

import BreedCard from "@/components/breed/breed-card";
import useGetBreeds from "@/utils/hook/useGetBreeds";
import { Breed } from "@prisma/client";
import { nanoid } from "@reduxjs/toolkit";
import Spinner from "../Spinner";
import BreedSkeleton from "../skeletons/breed-skeleton";

type BreedProps = {
  id: string;
  breedName: string;
  breedImages: string[];
  breedShortDescription: string;
};

function BreedGrid() {
  const { breeds = [], isFetching }: { breeds: Breed[]; isFetching: boolean } =
    useGetBreeds();

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

      {isFetching &&
        Array.from({ length: 20 }).map((_, index) => {
          return <BreedSkeleton key={index} />;
        })}
    </div>
  );
}

export default BreedGrid;
