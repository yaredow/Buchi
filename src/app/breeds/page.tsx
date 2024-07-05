import BreedGrid from "@/components/breed/breed-grid";
import Spinner from "@/components/Spinner";
import { getAllBreeds } from "@/data/breed";
import { Suspense } from "react";

export default async function page() {
  const breeds = await getAllBreeds();

  if (!breeds) {
    return <div>No breeds found</div>;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <BreedGrid breeds={breeds} />;
    </Suspense>
  );
}
