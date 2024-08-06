import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getUserById } from "@/data/user";
import {
  BriefcaseIcon,
  CheckIcon,
  Ellipsis,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  MoveHorizontalIcon,
  SchoolIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import BannerPlaceholder from "@/../public/images/secondary-banner-placeholder.jpg";

type IParams = {
  userId: string;
};

export default function Page({ params }: { params: IParams }) {
  const { userId } = params;
  const user = getUserById(userId);

  if (!user) return <div className="text-center">User not found</div>;

  return (
    <div className="mx-auto w-full p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="col-span-2 overflow-hidden rounded-lg shadow">
          <div className="relative">
            <Image
              src={BannerPlaceholder}
              alt="Cover"
              className="h-48 w-full object-contain"
              width="800"
              height="200"
            />
            <div className="absolute bottom-4 left-4">
              <Avatar className="h-24 w-24 rounded-full border-4">
                <AvatarImage src="/placeholder-user.jpg" alt="John Smith" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  John Smith{" "}
                  <CheckIcon className="inline-block h-5 w-5 text-blue-500" />
                </h2>
                <p className="text-muted-foreground">CMO at SingleFire</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">Message</Button>
                <Button>+Follow</Button>
                <Button variant="ghost">
                  <Ellipsis className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold">Intro</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li className="flex items-center">
              <BriefcaseIcon className="mr-2 h-5 w-5 text-muted-foreground" />{" "}
              CMO at SingleFire
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
              <a href="#" className="text-blue-500">
                jhon@contact.com
              </a>
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
            I&apos;m the model of the new CMO. I\&apos;ve combined a deep
            background in brand management at blue chip CPG companies with
            eCommerce growth marketing at the world\&apos;s biggest retailer.
            I\&apos;ve run SingleFire I\&apos;ve created world-class campaigns;
            I\&apos;ve built digital marketing organizations from the ground up.
            I have over 20 years&apos; experience leading...
            <a href="#" className="text-blue-500">
              See more
            </a>
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
