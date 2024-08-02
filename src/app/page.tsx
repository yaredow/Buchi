import Hero from "@/components/hero";
import HomePage from "@/components/home";
import BreedSkeleton from "@/components/skeletons/breed-skeleton";
import SkeletonLoader from "@/components/skeletons/skeleton-loader";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex flex-col gap-6">
      <Hero />
      <Suspense
        fallback={
          <SkeletonLoader
            count={30}
            SkeletonComponent={BreedSkeleton}
            className="grid w-full grid-cols-2 gap-4 md:grid-cols-4"
          />
        }
      >
        <HomePage />
      </Suspense>
    </main>
  );
}
