import { MenuIcon } from "lucide-react";
import ConversationList from "./ conversation-list";
import { Input } from "../ui/input";

export default function SideBar() {
  return (
    <aside className="min-h-screen border-r md:w-1/4">
      <div className="flex items-center justify-between p-4 md:border-b">
        <h2 className="text-lg font-semibold">Messages</h2>
        <MenuIcon className="h-6 w-6" />
      </div>
      <div className="border-b p-4">
        <Input placeholder="Search messages..." className="w-full" />
      </div>
      <ConversationList />
    </aside>
  );
}
