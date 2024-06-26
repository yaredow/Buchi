import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserBox() {
  return (
    <div className="group flex cursor-pointer items-center border-b p-4 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-gray-200 dark:hover:text-slate-800">
      <Avatar className="mr-4">
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between group-hover:text-slate-800">
          <span className="font-semibold group-hover:text-slate-900">
            Nahom A
          </span>
          <span className="text-sm text-slate-500 group-hover:text-gray-800">
            24 Jun
          </span>
        </div>
        <span className="text-sm text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-700">
          Samsung Galaxy Note 20 Ultra 256 GB Black
        </span>
        <span className="text-xs text-slate-400 group-hover:text-slate-500">
          Eshi last price snt new mecheresha yemtlw
        </span>
      </div>
    </div>
  );
}
