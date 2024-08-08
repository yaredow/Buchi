"use server";

import { getCurrentUser } from "@/data/user";
import { ErrorAndSuccessType } from "@/lib/schema";
import prisma from "@/utils/db/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function followUser(
  followingId: string,
): Promise<ErrorAndSuccessType> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) redirect("/auth/signin");

    await prisma.follows.create({
      data: {
        followerId: currentUser?.id,
        followingId,
      },
    });
    revalidatePath(`users/${followingId}`);
    return { success: "You are now following this user" };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function unfollowUser(
  followingId: string,
): Promise<ErrorAndSuccessType> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) redirect("/auth/signin");

    await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId: currentUser?.id,
          followingId,
        },
      },
    });
    revalidatePath(`users/${followingId}`);
    return { success: "You are no longer following this user" };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
