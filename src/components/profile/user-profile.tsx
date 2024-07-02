"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";
import { MessageCircleIcon, XIcon } from "lucide-react";
import { useState } from "react";

type UserProfileProps = {
  user: User;
};

export default function UserProfile({ user }: UserProfileProps) {
  const [showChat, setShowChat] = useState(false);
  const { name, userName, bio, image } = user;

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
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setShowChat(!showChat)}
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
      {showChat && (
        <div className="bg-background/50 fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-card w-full max-w-md rounded-xl p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Chat with John Doe</h3>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setShowChat(false)}
              >
                <XIcon className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <div className="h-[300px] overflow-y-auto">
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg bg-muted px-4 py-2 text-sm text-muted-foreground">
                    Hey there! How&apos;s it going?
                  </div>
                </div>
                <div className="flex items-start justify-end gap-4">
                  <div className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">
                    I&apos;m doing great, thanks for asking!
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Input placeholder="Type your message..." className="w-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
