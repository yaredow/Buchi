import BreedGrid from "@/components/breed/breed-grid";
import { getAllBreeds } from "@/data/breed";

export default async function page() {
  const breeds = await getAllBreeds();

  if (!breeds) {
    return <div>No breeds found</div>;
  }

  return <BreedGrid breeds={breeds} />;
}
