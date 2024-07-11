"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Defaultpfp from "@/../public/images/Default_pfp.svg";
import { User } from "lucide-react";

export default function UserMenu() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = () => {
    signOut({ callbackUrl: "http://localhost:3000" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={() => {
            if (status === "unauthenticated") {
              router.replace("/auth/signin");
            }
          }}
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          {session ? (
            <Image
              src={session?.user.image === null && Defaultpfp}
              alt="User profile picture"
              width={50}
              height={50}
              className="aspect-square rounded-full bg-background object-cover"
            />
          ) : (
            <User size={22} strokeWidth={1.5} />
          )}
        </Button>
      </DropdownMenuTrigger>
      {status === "authenticated" ? (
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            {session.user ? session.user?.name : "Your Account"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/profile/setting">Setting</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      ) : null}
    </DropdownMenu>
  );
}
