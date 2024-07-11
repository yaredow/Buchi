"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import DefaultPfp from "@/../public/images/Default_pfp.svg";
import useGetUser from "@/utils/hook/useGetUser";
import { User } from "@prisma/client";
import Spinner from "../Spinner";

type UseGetUserProps = {
  user: User & {
    breed: {
      breedName: string;
    };
  };
  isFetching: boolean;
};

export default function UserProfile({ userId }: { userId: string }) {
  const { user, isFetching }: UseGetUserProps = useGetUser(userId);
  const router = useRouter();

  const handleClick = () => {
    router.push("/chat");
  };

  if (isFetching)
    return (
      <div className="grid items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="mx-auto w-full max-w-2xl rounded-xl bg-background p-8 shadow-lg">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-32 w-32">
            <AvatarImage src={user.image || DefaultPfp} />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="space-y-2 text-start">
            <h2 className="text-3xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">{user.userName}</p>
          </div>
        </div>

        <Button
          onClick={handleClick}
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          <MessageCircleIcon className="h-6 w-6" />
          <span className="sr-only">Chat</span>
        </Button>
      </div>
      <div className="mt-6 rounded-lg bg-muted px-4 py-2 text-sm text-muted-foreground">
        {`Proud owner of a ${user.breed.breedName}`}
      </div>
      <div className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {user.bio}
      </div>
    </div>
  );
}
