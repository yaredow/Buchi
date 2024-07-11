"use server";

import { auth } from "@/auth";
import prisma from "@/utils/db/db";
import { User } from "@prisma/client";

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findFirst({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const session = await auth();

    if (!session) {
      return null;
    }

    const currentUser = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    console.error(error);
    return null;
  }
}
