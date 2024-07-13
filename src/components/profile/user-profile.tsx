"use client";

import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import DefaultPfp from "@/../public/images/Default_pfp.svg";
import Spinner from "../Spinner";
import useGetUser from "@/utils/hook/useGetUser";
import { Breed, User } from "@prisma/client";
import { MessageCircleIcon } from "lucide-react";

type UseGetUserType = {
  user: User & {
    breed: Breed;
  };
  isFetching: boolean;
};

export default function UserProfile({ userId }: { userId: string }) {
  const { user, isFetching }: UseGetUserType = useGetUser(userId);
  const router = useRouter();

  const handleClick = () => {
    router.push("/conversations");
  };

  if (isFetching)
    return (
      <div className="grid items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="mx-auto w-full max-w-4xl rounded-xl bg-background p-8 shadow-lg">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-32 w-32">
            <AvatarImage src={user.image || DefaultPfp} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
          <div className="space-y-2 text-start">
            <h2 className="text-3xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">@{user.userName}</p>
            <div className="mt-4 flex space-x-4">
              <Button
                onClick={handleClick}
                variant="ghost"
                size="sm"
                className="rounded-full"
              >
                <MessageCircleIcon className="h-6 w-6" />
                <span className="sr-only">Chat</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-muted px-4 py-2 text-sm text-muted-foreground dark:bg-slate-800 dark:text-slate-100">
        {`Proud owner of a ${user.breed.breedName}`}
      </div>
      <div className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {user.bio}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="col-span-1 flex flex-col items-center rounded-lg bg-muted p-4 shadow dark:bg-slate-800 dark:text-slate-100">
          <span className="text-lg font-bold">Posts</span>
          <span className="text-2xl">{24}</span>
        </div>

        <div className="col-span-1 flex flex-col items-center rounded-lg bg-muted p-4 shadow dark:bg-slate-800 dark:text-slate-100">
          <span className="text-lg font-bold">Followers</span>
          <span className="text-2xl">{15}</span>
        </div>
        <div className="col-span-1 flex flex-col items-center rounded-lg bg-muted p-4 shadow dark:bg-slate-800 dark:text-slate-100">
          <span className="text-lg font-bold">Following</span>
          <span className="text-2xl">{4}</span>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold">Recent Activity</h3>
        <div className="mt-4 space-y-4">
          {/* {user.recentActivity.map((activity: any) => (
            <div key={activity.id} className="rounded-lg bg-muted dark:bg-slate-800 dark:text-slate-100 p-4 shadow">
              <p className="text-sm text-muted-foreground">{activity.text}</p>
              <span className="text-xs text-muted-foreground">
                {activity.date}
              </span>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
