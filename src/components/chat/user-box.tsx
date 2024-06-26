import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserBox() {
  return (
    <div className="flex cursor-pointer items-center border-b p-4 hover:bg-gray-100">
      <Avatar className="mr-4">
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <span className="font-semibold">እምባ በግ</span>
          <span className="text-sm text-gray-500">24 Jun</span>
        </div>
        <span className="text-sm text-gray-500">
          Samsung Galaxy Note 20 Ultra 256 GB Black
        </span>
        <span className="text-xs text-gray-400">
          Eshi last price snt new mecheresha yemtlw
        </span>
      </div>
    </div>
  );
}
