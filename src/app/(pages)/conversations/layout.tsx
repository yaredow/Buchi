import SideBar from "@/components/conversation/side-bar";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full">
      <div className="mx-8 flex flex-row items-center justify-center border md:rounded-md">
        <SideBar />
        <div className="w-3/4 md:min-h-[80vh]">{children}</div>
      </div>
    </main>
  );
}
