"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useRef, useState, useTransition } from "react";
import UseProfile from "@/../public/images/Default_pfp.svg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { CameraIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Spinner from "@/components/Spinner";
import { toast } from "@/components/ui/use-toast";
import { User } from "next-auth";
import _ from "lodash";
import { DialogDescription } from "@radix-ui/react-dialog";
import {
  updateUserData,
  uploadUserProfileImage,
} from "@/server/actions/auth/actions";
import UpdatePasswordForm from "@/components/form/update-password-form";

export default function Page() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false);
  const [isEditingFullname, setIsEditingaFullname] = useState<boolean>(false);
  const [isEditingUserEmail, setIsEditingUserEmail] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session, status } = useSession();
  const user = session?.user;
  const [userData, setUserData] = useState<User | null>(null);
  const hasNoChange = _.isEqual(user, userData);
  const userName =
    user?.userName === "" ? user.email?.split("@")[0] : user?.userName;

  const handleSignout = async () => {
    await signOut({ callbackUrl: "/auth/login" });
  };

  const handleUserDataChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    field: keyof User,
  ) => {
    setUserData((prev) => ({
      ...(prev as User),
      [field]: evt.target.value,
    }));
  };

  // open the hidden input field
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // upload user profile picture
  const handleUserProfileImageUpload = async (
    evt: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const image = evt.target.files?.[0];
    const formData = new FormData();
    formData.append("userId", user?.id as string);

    if (image) {
      formData.append("image", image);
    }

    const result = await uploadUserProfileImage(formData);

    if (result.success) {
      toast({
        description: "profile image uploaded successfully",
      });
    } else {
      toast({
        variant: "destructive",
        description: "Failed to upload profile image",
      });
    }
  };

  const handleUserDataUPdate = async () => {
    setIsLoading(true);
    const formData = new FormData();
    if (user) {
      for (const key in userData) {
        if (userData[key as keyof User]) {
          formData.append(key, userData[key as keyof User] as string);
        }
      }
    }

    startTransition(() => {
      updateUserData(formData).then((data) => {
        if (data.success) {
          toast({
            description: data.success,
          });
        } else {
          toast({
            variant: "destructive",
            description: data.error,
          });
        }
      });
    });
  };

  useEffect(() => {
    if (status === "authenticated" && user) {
      setUserData({
        ...user,
        userName: userName as string,
      });
    }
  }, [user, status, userName]);

  if (status === "loading") return <Spinner />;

  return (
    <main
      className={`mx-8 my-8 flex-grow md:mx-40 md:my-8 ${isLoading && "opacity-60"}`}
    >
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-row items-center gap-4">
          <div key="1" className="relative h-[100px] w-[100px]">
            <Avatar
              className={`h-full w-full rounded-full ${isLoading && "opacity-80"}`}
            >
              <AvatarImage
                alt="User Avatar"
                src={user?.image || UseProfile.src}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleUserProfileImageUpload}
              style={{ display: "none" }}
            />

            {isEditing ? (
              <Button
                onClick={handleButtonClick}
                className="absolute bottom-0 right-0 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-white bg-white p-1 transition-colors dark:border-gray-950"
                size="icon"
                variant="outline"
              >
                <CameraIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Upload Avatar</span>
              </Button>
            ) : null}
          </div>
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">{user?.name}</h1>
            <p className="text-sm">{`@${userName}`}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => {
              if (isEditing && !hasNoChange) {
                handleUserDataUPdate();
              }
              setIsEditing(!isEditing);
            }}
          >
            {isEditing ? "Save profile" : "Edit Profile"}
          </Button>
          <Button>My Dogs</Button>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-8">
        <h1 className="text-3xl font-semibold">Account</h1>
        <div className="flex items-center justify-between">
          <div className="h-12">
            <h4 className="font-semibold">Full Name</h4>
            {isEditingFullname ? (
              <Input
                className="mt-2"
                type="text"
                value={userData?.name || ""}
                onChange={(evt) => handleUserDataChange(evt, "name")}
              />
            ) : (
              <p className="text-sm">{userData?.name}</p>
            )}
          </div>
          <Button
            className="w-[85px]"
            disabled={!isEditing}
            onClick={() => setIsEditingaFullname(!isEditingFullname)}
            variant="outline"
          >
            {isEditingFullname ? "Save" : "Change"}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="h-12">
            <h4 className="font-semibold">Username</h4>
            {isEditingUsername ? (
              <Input
                className="mt-2"
                type="text"
                value={userData?.userName || ""}
                onChange={(evt) => handleUserDataChange(evt, "userName")}
              />
            ) : (
              <p className="text-sm">{userName}</p>
            )}
          </div>
          <Button
            className="w-[85px]"
            disabled={!isEditing}
            onClick={() => setIsEditingUsername(!isEditingUsername)}
            variant="outline"
          >
            {isEditingUsername ? "Save" : "Change"}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="h-12">
            <h4 className="font-semibold">Email Adress</h4>
            {isEditingUserEmail ? (
              <Input
                className="mt-2"
                type="text"
                value={userData?.email || ""}
                onChange={(evt) => handleUserDataChange(evt, "email")}
              />
            ) : (
              <p className="text-sm">{userData?.email as string}</p>
            )}
          </div>
          <Button
            className="w-[85px]"
            disabled={!isEditing}
            variant="outline"
            onClick={() => setIsEditingUserEmail(!isEditingUserEmail)}
          >
            {isEditingUserEmail ? "Save" : " Change"}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold">Password</h4>
            <p className="text-sm">************</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                disabled={!isEditing}
                variant="outline"
                className="w-[85px]"
              >
                Reset
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-lg">
              <DialogHeader>
                <DialogTitle className="mb-4">Update your password</DialogTitle>
                <DialogDescription>
                  You will be logged out once you change your password
                </DialogDescription>
              </DialogHeader>

              <UpdatePasswordForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mx-auto mt-8 flex items-center justify-center">
        <Button
          onClick={handleSignout}
          className="hover:text-red-400"
          variant="outline"
        >
          Log out
        </Button>
      </div>
    </main>
  );
}
