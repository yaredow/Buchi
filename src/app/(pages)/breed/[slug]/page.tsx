import BreedDetails from "@/components/breed/breed-details";
import { getAllBreeds, getBreedWithSlug } from "@/data/breed";
import { Breed } from "@prisma/client";
import { Metadata } from "next";

type IParams = {
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: IParams;
}): Promise<Metadata> {
  const { slug } = params;
  const breed = await getBreedWithSlug(slug);

  return { title: `Breed ${breed?.breedName}` };
}

export async function generateStaticParams() {
  const breeds = await getAllBreeds();

  if (!breeds) return [];

  const slugs = breeds.map((breed) => ({
    cabinId: String(breed.slug),
  }));

  return slugs;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const breed = (await getBreedWithSlug(slug)) as Breed;

  return <BreedDetails breed={breed} />;
}
