import prisma from "@/utils/db/db";

export const getAllBreeds = async () => {
  try {
    const breeds = await prisma.breed.findMany();

    if (!breeds) return null;

    return breeds;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getBreedWithSlug = async (slug: string) => {
  try {
    const breed = await prisma.breed.findFirst({ where: { slug: slug } });

    if (!breed) return null;

    return breed;
  } catch (error) {
    console.error(error);
    return null;
  }
};
