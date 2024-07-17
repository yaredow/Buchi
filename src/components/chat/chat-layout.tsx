"use client";

import { userData } from "@/app/data";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import SideBar from "../conversation/side-bar";
import { Chat } from "./chat";

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function ChatLayout({
  defaultLayout = [480, 560],
  defaultCollapsed = false,
  navCollapsedSize,
}: ChatLayoutProps) {
  const [selectedUser, setSelectedUser] = React.useState(userData[0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenWidth();

    // Event listener for screen width changes
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <div className="flex h-full">
      <div className="">
        <SideBar
          links={userData.map((user) => ({
            name: user.name,
            messages: user.messages ?? [],
            avatar: user.avatar,
            variant: selectedUser.name === user.name ? "grey" : "ghost",
          }))}
          isMobile={isMobile}
        />
      </div>
      <div className="flex-grow">
        <Chat
          messages={selectedUser.messages}
          selectedUser={selectedUser}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}
