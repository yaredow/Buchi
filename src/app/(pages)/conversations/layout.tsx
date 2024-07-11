import SideBar from "@/components/conversation/side-bar";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <div className="flex flex-row items-center justify-center border">
        <SideBar />
        {children}
      </div>
    </div>
  );
}
