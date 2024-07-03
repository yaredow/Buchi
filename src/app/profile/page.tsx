"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useRef, useState, useTransition } from "react";
import UseProfile from "@/../public/images/Default_pfp.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CameraIcon, PencilIcon, Save } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Spinner from "@/components/Spinner";
import { toast } from "@/components/ui/use-toast";
import _ from "lodash";
import {
  updateUserData,
  uploadUserProfileImage,
} from "@/server/actions/auth/actions";
import AccountField from "@/components/profile/account-field";
import PasswordResetField from "@/components/profile/password-reset-field";
import { User } from "@prisma/client";

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editFields, setEditFields] = useState({
    username: false,
    fullname: false,
    email: false,
    bio: false,
  });
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session, status } = useSession();
  const user = session?.user;
  const [userData, setUserData] = useState<User | null>(null);
  const hasNoChange = _.isEqual(user, userData);
  const userName = user?.userName || user?.email?.split("@")[0];

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
        userName,
      });
    }
  }, [user, status, userName]);

  if (status === "loading") {
    return (
      <div className="grid min-h-[85vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

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

            {isEditing && (
              <Button
                onClick={handleButtonClick}
                className="absolute bottom-0 right-0 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-white bg-white p-1 transition-colors dark:border-gray-950"
                size="icon"
                variant="outline"
              >
                <CameraIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Upload Avatar</span>
              </Button>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold md:text-3xl">{user?.name}</h1>
            <p className="text-sm">{`@${userName}`}</p>
            <div className="flex flex-row items-center justify-center gap-6">
              <div className="h-12">
                <h4 className="font-semibold">Email Address</h4>
                {editFields.bio ? (
                  <Input
                    className="mt-2"
                    type="text"
                    value={userData?.bio || "Add a bio..."}
                    onChange={(evt) => handleUserDataChange(evt, "bio")}
                  />
                ) : (
                  <p className="text-sm">{userData?.bio}</p>
                )}
              </div>
              <Button
                disabled={!isEditing}
                variant="link"
                size="icon"
                onClick={() =>
                  setEditFields((prev) => ({ ...prev, bio: !prev.bio }))
                }
              >
                {editFields.bio ? <Save size={14} /> : <PencilIcon />}
              </Button>
            </div>
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
        <AccountField
          label="Full Name"
          value={userData?.name}
          isEditing={isEditing}
          isFieldEditing={editFields.fullname}
          onEditClick={() =>
            setEditFields((prev) => ({ ...prev, fullname: !prev.fullname }))
          }
          onChange={(evt) => handleUserDataChange(evt, "name")}
        />
        <AccountField
          label="Username"
          value={userName}
          isEditing={isEditing}
          isFieldEditing={editFields.username}
          onEditClick={() =>
            setEditFields((prev) => ({ ...prev, username: !prev.username }))
          }
          onChange={(evt) => handleUserDataChange(evt, "userName")}
        />
        <AccountField
          label="Email Address"
          value={userData?.email}
          isEditing={isEditing}
          isFieldEditing={editFields.email}
          onEditClick={() =>
            setEditFields((prev) => ({ ...prev, email: !prev.email }))
          }
          onChange={(evt) => handleUserDataChange(evt, "email")}
        />
        <PasswordResetField isEditing={isEditing} />
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
