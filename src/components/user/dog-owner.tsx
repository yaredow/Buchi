"use client";

import { User } from "@prisma/client";
import DefaultPfp from "@/../public/images/Default_pfp.svg";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";

function DogOwnerCard({ user }: { user: User }) {
  return (
    <Link
      href={`/profile/${user.id}`}
      className="flex flex-row items-center justify-center gap-2 border p-2 hover:bg-muted-foreground"
    >
      <Avatar>
        <AvatarImage
          src={user.image || DefaultPfp.src}
          alt={user.name || "dog owner image"}
          className="rounded-full"
        />
      </Avatar>
      <div className="px-2">
        <h1>{user.name}</h1>
        <span className="text-sm text-muted-foreground">{`@${user.userName?.toLowerCase()}`}</span>
      </div>
    </Link>
  );
}

export default function DogOwner({ breedOwners }: { breedOwners: User[] }) {
  return (
    <div className="w-full bg-background py-4">
      <h2 className="mb-6 text-2xl font-bold">People who own this breed</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {breedOwners.map((user) => (
          <DogOwnerCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
