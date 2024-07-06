import BreedDetails from "@/components/breed/breed-details";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return <BreedDetails slug={slug} />;
}
