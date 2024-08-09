"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Ban,
  Blocks,
  Dog,
  Ellipsis,
  Link,
  MailIcon,
  MapPinIcon,
  Upload,
  UserPlus,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import BannerPlaceholder from "@/../public/images/secondary-banner-placeholder.jpg";
import DefaultPfp from "@/../public/images/Default_pfp.svg";
import { getInitials } from "@/lib/formatName";
import { useRouter } from "next/navigation";
import { FullConversationType } from "@/types/conversation";
import { useState, useTransition } from "react";
import { followUser, unfollowUser } from "@/server/actions/user/actions";
import { toast } from "../ui/use-toast";
import { FullUserType } from "@/types/user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type PublicUSerProfileProps = {
  user: FullUserType;
  isFollowing: boolean;
};

export default function UserPublicProfile({
  user,
  isFollowing,
}: PublicUSerProfileProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isHovering, setIsHovering] = useState(false);

  const handleStartConversation = async () => {
    const response = await fetch("/api/conversations", {
      method: "POST",
      body: JSON.stringify({ userId: user.id }),
    });

    if (response.ok) {
      const conversation = (await response.json()) as FullConversationType;
      router.push(`http://localhost:3000/conversations/${conversation.id}`);
    }
  };

  const handleUserFollow = () => {
    startTransition(() => {
      followUser(user.id).then((data) => {
        if (data.success) {
          toast({
            description: data.success,
          });
        } else {
          toast({
            description: "Something went wrong",
            variant: "destructive",
          });
        }
      });
    });
  };

  const handleUserUnfollow = () => {
    startTransition(() => {
      unfollowUser(user.id).then((data) => {
        if (data.success) {
          toast({
            description: data.success,
          });
        } else {
          toast({
            variant: "destructive",
            description: "Something went wrong",
          });
        }
      });
    });
  };

  return (
    <div className="mx-auto max-w-6xl md:p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="col-span-2 overflow-hidden rounded-lg shadow">
          <div className="relative w-full">
            <Image
              src={BannerPlaceholder}
              alt="Cover"
              className="h-48 w-full object-cover"
              width="800"
              height="200"
            />
            <div className="absolute -bottom-10 left-4">
              <Avatar className="h-24 w-24 rounded-full border-4">
                <AvatarImage
                  src={user.image || DefaultPfp.src}
                  alt="John Smith"
                />
                <AvatarFallback className="text-2xl text-muted-foreground">
                  {getInitials(user.name || "")}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="mt-6 p-4">
            <div className="flex flex-col justify-start gap-4">
              <div className="mt-2 flex flex-col gap-1">
                <h2 className="text-xl font-bold md:text-2xl">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{`${user.breed.breedName} owner`}</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-sm">
                  <span className="text-blue-500">12</span> followers
                </div>
                <div className="text-sm">
                  <span className="text-blue-500">12</span> following
                </div>
              </div>

              <div className="flex space-x-2">
                <div className="flex flex-row gap-2">
                  <Button onClick={handleStartConversation} variant="outline">
                    Message
                  </Button>
                  {isFollowing ? (
                    <Button
                      disabled={isPending}
                      onClick={handleUserUnfollow}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      className="flex w-[120px] items-center justify-center gap-2 rounded-lg px-4 py-2 hover:bg-red-500 hover:text-white" // Example fixed width
                    >
                      {isHovering ? "Unfollow" : "Following"}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleUserFollow}
                      disabled={isPending}
                      className="flex items-center justify-center gap-2"
                    >
                      <span>Follow</span>
                      <UserPlus size={16} />
                    </Button>
                  )}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      <Ellipsis className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="flex flex-col items-start justify-start">
                    <DropdownMenuItem className="flex items-center justify-center gap-2">
                      <Ban size={16} />
                      <span>{`Block @${user.userName?.toLowerCase()}`}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center justify-center gap-2">
                      <Upload size={16} />
                      <span>Share profile via...</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center justify-center gap-2">
                      <Link size={16} />
                      <span>Copy link to profile</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg px-4 shadow">
          <h3 className="text-lg font-semibold">Intro</h3>
          <ul className="mt-2 space-y-4 text-sm">
            <li className="flex items-center">
              <Dog className="mr-2 h-5 w-5 text-muted-foreground" />{" "}
              {`${user.breed.breedName} owner`}
            </li>
            <li className="flex items-center">
              <MapPinIcon className="mr-2 h-5 w-5 text-muted-foreground" />{" "}
              Lives in{" "}
              <span className="ml-[4px] font-semibold">
                Addis Ababa, Ethiopia
              </span>
            </li>
            <li className="flex items-center">
              <UsersIcon className="mr-2 h-5 w-5 text-muted-foreground" />{" "}
              Followed by{" "}
              <span className="ml-[4px] font-semibold">12.5k people</span>
            </li>
            <li className="flex items-center">
              <MailIcon className="mr-2 h-5 w-5 text-muted-foreground" /> Email
              <span className="ml-[4px] font-semibold">
                <a href="#">{user.email}</a>
              </span>{" "}
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold">About</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {user.bio || "Dog lover"}
          </p>
        </div>

        <div className="col-span-2 rounded-lg p-4 shadow">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold">Marketing expertise</h4>
              <p className="mt-1 text-sm text-blue-500"></p>
              <p className="mt-2 text-sm font-semibold">Open to networking</p>
              <p className="text-green-500">Yes</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Marketing interests</h4>
              <p className="mt-1 text-sm text-blue-500"></p>
              <p className="mt-2 text-sm font-semibold">Open to advising</p>
              <p className="text-green-500">Yes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 w-full rounded-lg p-4 shadow">
        <Tabs defaultValue="posts" className="h-full w-full">
          <TabsList className="flex w-full flex-row justify-between">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="replies">Replies</TabsTrigger>
            <TabsTrigger value="medias">Medias</TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mx-2">
            No post are available
          </TabsContent>
          <TabsContent value="replies" className="mx-2">
            No replies are available
          </TabsContent>
          <TabsContent value="medias" className="mx-2">
            No medias are available
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
