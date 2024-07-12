import SideBar from "@/components/conversation/side-bar";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <div className="flex flex-row items-center justify-center border md:rounded-md">
        <SideBar />
        <main className="w-3/4">{children}</main>
      </div>
    </div>
  );
}
