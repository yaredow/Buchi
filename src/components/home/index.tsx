import React from "react";
import BreedGrid from "../breed/breed-grid";
import { getAllBreeds } from "@/data/breed";
import { Breed } from "@prisma/client";

export default async function HomePage() {
  const breeds = (await getAllBreeds()) as Breed[];

  return (
    <section className="mb-10">
      <BreedGrid breeds={breeds} />
    </section>
  );
}
