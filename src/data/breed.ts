import prisma from "@/utils/db/db";

export async function getAllBreeds() {
  try {
    const breeds = await prisma.breed.findMany();

    if (!breeds) return null;

    return breeds;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getBreedWithSlug(slug: string) {
  try {
    const breed = await prisma.breed.findFirst({ where: { slug: slug } });

    if (!breed) return null;

    return breed;
  } catch (error) {
    console.error(error);
    return null;
  }
}
