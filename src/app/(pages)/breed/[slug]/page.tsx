import BreedDetails from "@/components/breed/breed-details";
import { getAllBreeds, getBreedWithSlug } from "@/data/breed";

type IParams = {
  slug: string;
};

export async function generateMetadta({ params }: { params: IParams }) {
  const { slug } = params;
  const breed = await getBreedWithSlug(slug);

  return { title: `Breed ${breed?.breedName}` };
}

export async function generateStaticParams() {
  const breeds = await getAllBreeds();

  const slugs = breeds?.map((breed) => ({
    slug: breed.slug,
  }));

  return slugs;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const breed = await getBreedWithSlug(slug);

  return <BreedDetails breed={breed} />;
}
