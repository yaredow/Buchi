"use client";

import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { selectBreed } from "@/store/breedSlice/breedSlice";

export default function Page({ params }: { params: { breedId: string } }) {
  const breedId = Number(params.breedId);
  const breed = useAppSelector(selectBreed(breedId));

  if (!breed) return <div>No dog breed found</div>;

  return (
    <section className="mx-6 md:mx-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center">
        <div className="mx-4 mt-4 h-[50vh] w-full overflow-hidden">
          <Image
            alt={breed?.breedImages[0] as string}
            className="h-full w-full rounded-btn object-cover object-center"
            height={800}
            src={`/images/breeds/${breed?.breedImages[0] as string}.jpg`}
            width={1200}
          />
        </div>

        <div className="mt-4 w-full gap-2 space-y-4">
          <h2 className="text-lg font-semibold">{`${breed.breedName} Gallery`}</h2>
          <ul className="flex flex-row items-center gap-4">
            {breed.breedImages.map((image, index) => (
              <li key={index}>
                <Image
                  alt={breed.breedName}
                  className="rounded-btn shadow"
                  height={400}
                  src={`/images/breeds/${image}.jpg`}
                  width={800}
                  unoptimized={true}
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
