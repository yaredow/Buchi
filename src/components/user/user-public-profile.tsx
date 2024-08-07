"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dog,
  Ellipsis,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  SchoolIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import BannerPlaceholder from "@/../public/images/secondary-banner-placeholder.jpg";
import DefaultPfp from "@/../public/images/Default_pfp.svg";
import { getInitials } from "@/lib/formatName";
import { Breed, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FullConversationType } from "@/types/conversation";

type FullUserType = User & {
  breed: Breed;
};

type PublicUSerProfileProps = {
  user: FullUserType;
};

export default function UserPublicProfile({ user }: PublicUSerProfileProps) {
  const router = useRouter();

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

  return (
    <div className="mx-auto max-w-6xl p-4">
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
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold md:text-2xl">{user.name}</h2>
                <p className="text-sm text-muted-foreground md:text-lg">
                  {`@${user.userName?.toLowerCase()}`}
                </p>
              </div>
              <div className="flex space-x-2">
                <div className="flex flex-col gap-2 md:flex-row">
                  <Button onClick={handleStartConversation} variant="outline">
                    Message
                  </Button>
                  <Button>+Follow</Button>
                </div>
                <Button variant="ghost">
                  <Ellipsis className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg px-4 shadow">
          <h3 className="text-lg font-semibold">Intro</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li className="flex items-center">
              <Dog className="mr-2 h-5 w-5 text-muted-foreground" />{" "}
              {`${user.breed.breedName} owner`}
            </li>
            <li className="flex items-center">
              <SchoolIcon className="mr-2 h-5 w-5 text-muted-foreground" /> Went
              to <span className="font-semibold">Oxford International</span>
            </li>
            <li className="flex items-center">
              <MapPinIcon className="mr-2 h-5 w-5 text-muted-foreground" />{" "}
              Lives in <span className="font-semibold">Virginia, NY</span>
            </li>
            <li className="flex items-center">
              <UsersIcon className="mr-2 h-5 w-5 text-muted-foreground" />{" "}
              Followed by <span className="font-semibold">12.5k people</span>
            </li>
            <li className="flex items-center">
              <MailIcon className="mr-2 h-5 w-5 text-muted-foreground" /> Email{" "}
              <a href="#">jhon@contact.com</a>
            </li>
            <li className="flex items-center">
              <LinkedinIcon className="mr-2 h-5 w-5 text-muted-foreground" />{" "}
              Linkedin{" "}
              <a href="#" className="text-blue-500">
                @jhon_S
              </a>
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
              <p className="mt-1 text-sm text-blue-500">
                #leadership, #advertising, #public-relations, #branding
              </p>
              <p className="mt-2 text-sm font-semibold">Open to networking</p>
              <p className="text-green-500">Yes</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Marketing interests</h4>
              <p className="mt-1 text-sm text-blue-500">
                #event-marketing, #performance-marketing,
                #account-based-marketing
              </p>
              <p className="mt-2 text-sm font-semibold">Open to advising</p>
              <p className="text-green-500">Yes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg p-4 shadow">
        <div className="flex items-center justify-between text-sm font-semibold">
          <a href="#" className="text-blue-500">
            Vendors (32)
          </a>
          <a href="#" className="text-blue-500">
            Advice (18)
          </a>
          <a href="#" className="text-blue-500">
            Experts (52)
          </a>
          <a href="#" className="text-blue-500">
            Followers (142)
          </a>
        </div>
      </div>
    </div>
  );
}
