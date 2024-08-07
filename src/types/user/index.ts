import { Breed, User } from "@prisma/client";

export type FullUserType = User & {
  breed: Breed;
};
