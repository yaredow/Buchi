"use client";

import { getBreed } from "@/store/breedSlice/breedSlice";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { DogBreed } from "@/../types/breed";
import { RootState } from "@/store/store";

export default function Page({ params }: { params: { breedId: number } }) {
  const { breedId } = params;
  console.log(breedId);
  const breed = useAppSelector(getBreed(breedId)) as DogBreed;

  console.log(breed);

  return (
    <section className="mx-6 md:mx-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center">
        <div className="mx-4 mt-4 h-[50vh] w-full overflow-hidden">
          <Image
            alt={breed?.breedImages[0] as string}
            className="h-full w-full rounded-md object-cover object-center"
            height={800}
            src={breed?.breedImages[0] as string}
            width={1200}
          />
        </div>

        <div className="mt-4 w-full gap-2 space-y-4">
          <h2 className="text-lg font-semibold">{`${breed.breedName} Gallery`}</h2>
          <ul className="flex flex-row items-center gap-4">
            {breed.breedImages.map((image, index) => (
              <li key={index}>
                <Image
                  alt="dog image"
                  className="aspect-video rounded-md object-cover"
                  height={200}
                  src={`/images/breeds/${image}.jpg`}
                  width={300}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 w-full">
          <p className="mx-4 text-sm">{breed.breedLongDescription}</p>
        </div>
      </div>
    </section>
  );
}
