"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";
import { MessageCircleIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type UserProfileProps = {
  user: User;
};

export default function UserProfile({ user }: UserProfileProps) {
  const { name, userName, bio, image } = user;
  const router = useRouter();

  const handleClick = () => {
    router.push("/chat");
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-xl bg-background p-8 shadow-lg">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-32 w-32">
            <AvatarImage src={image || ""} />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">{name}</h2>
            <p className="text-muted-foreground">{userName}</p>
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
        Proud owner of a Labrador Retriever
      </div>
      <div className="mt-4 text-sm leading-relaxed text-muted-foreground">
        I love spending time with my furry friend, Buddy. We enjoy long walks in
        the park, playing fetch, and cuddling on the couch. As an avid dog
        lover, I&apos;m excited to connect with other Labrador owners on this
        platform.
      </div>
    </div>
  );
}
