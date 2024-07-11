import { MenuIcon } from "lucide-react";
import UserBox from "./user-box";
import { Input } from "@/components/ui/input";

export default function SideBar() {
  return (
    <div className="flex w-full flex-col md:w-1/3 md:border-r">
      <div className="flex items-center justify-between p-4 md:border-b">
        <h2 className="text-lg font-semibold text-green-600">My messages</h2>
        <MenuIcon className="h-6 w-6" />
      </div>
      <div className="border-b p-4">
        <Input placeholder="Search messages..." className="w-full" />
      </div>
      <div className="flex flex-col overflow-y-auto">
        {Array.from({ length: 6 }).map((_, index) => (
          <UserBox key={index} />
        ))}
      </div>
    </div>
  );
}
