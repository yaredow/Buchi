import prisma from "@/utils/db/db";
import { getCurrentUser } from "./user";

export const getAllBreeds = async () => {
  try {
    const breeds = await prisma.breed.findMany();

    return breeds;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getBreedWithSlug = async (slug: string) => {
  try {
    const breed = await prisma.breed.findFirst({ where: { slug } });

    return breed;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getDogOwnners = async (breedId: string) => {
  try {
    const currentUser = await getCurrentUser();

    const owners = await prisma.user.findMany({
      where: { breedId, email: { not: currentUser?.email } },
      include: { breed: true },
    });

    return owners;
  } catch (error) {
    console.error(error);
    return null;
  }
};
