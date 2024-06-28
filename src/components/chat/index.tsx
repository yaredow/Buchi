import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MenuIcon, MicIcon, PaperclipIcon, SmileIcon } from "lucide-react";
import UserBox from "./user-box";

export default function Chat() {
  return (
    <div className="flex h-screen w-full border">
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

      {/* conversation */}
      <div className="hidden md:flex md:flex-1 md:flex-col">
        <div className="flex items-center justify-between p-4 md:border-b">
          <div className="flex items-center">
            <Avatar className="mr-4">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>MM</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold">Mintu Mk</span>
              <span className="text-sm text-slate-500 dark:text-slate-300">
                Samsung Galaxy Note 20 Ultra 256 GB Black
              </span>
            </div>
          </div>
          <span className="text-green-600">ETB 36,000</span>
        </div>
        <div className="flex-1 overflow-y-auto bg-slate-100 p-4 dark:bg-slate-300">
          <div className="mb-4 flex justify-center">
            <span className="text-sm text-slate-500 dark:text-slate-700">
              June, 26 2024
            </span>
          </div>
          <div className="mb-4 flex justify-start">
            <div className="flex max-w-xs flex-col rounded-lg bg-white p-2 shadow dark:bg-slate-600">
              <span>selam nw silkun lemegzat nbr</span>
              <span className="self-end text-xs text-slate-500 dark:text-slate-200">
                13:58{" "}
              </span>
            </div>
          </div>
          <div className="mb-4 flex justify-end">
            <div className="flex max-w-xs flex-col rounded-lg bg-green-200 p-2 shadow dark:bg-green-400">
              <span>Hi Mintu, Ale</span>
              <span className="self-end text-xs text-slate-500 dark:text-slate-200">
                14:06
              </span>
            </div>
          </div>
          <div className="mb-4 flex justify-end">
            <div className="flex max-w-xs flex-col rounded-lg bg-green-200 p-2 shadow dark:bg-green-400">
              <span>0928315616 bezih silk dewl</span>
              <span className="self-end text-xs text-slate-500 dark:text-slate-200">
                15:25
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center border-t p-4">
          <SmileIcon className="mr-4 h-6 w-6" />
          <Input placeholder="Write your message here" className="flex-1" />
          <PaperclipIcon className="mx-4 h-6 w-6" />
          <MicIcon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
