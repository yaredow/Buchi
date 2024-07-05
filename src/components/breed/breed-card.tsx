"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface BreedCardProps {
  slug: string;
  breedName: string;
  breedImages: string[];
  breedShortDescription: string;
}

const BreedCard: FC<BreedCardProps> = ({
  slug,
  breedName,
  breedImages,
  breedShortDescription,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/breeds/${slug}`);
  };

  return (
    <article
      onClick={handleClick}
      className="mb-4 cursor-pointer rounded-lg text-secondary-body"
    >
      <Image
        src={`/images/breeds/${breedImages[0]}.jpg`}
        alt={breedName}
        width={800}
        height={400}
        className="rounded-btn shadow"
        unoptimized={true}
      />
      <h2 className="text-md mb-2 mt-2 font-semibold">{breedName}</h2>
      <p className="text-sm">{breedShortDescription}</p>
    </article>
  );
};

export default BreedCard;
