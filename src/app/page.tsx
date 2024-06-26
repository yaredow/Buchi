import Hero from "@/components/hero";
import HomePage from "@/components/home";

export default function Home() {
  return (
    <main className="flex flex-col gap-6">
      <Hero />
      <HomePage />
    </main>
  );
}
