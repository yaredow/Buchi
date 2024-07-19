import EmptyState from "@/components/empty-chat";

export const metadata = {
  title: "Chat",
  description: "Chat with fellow dog owners",
};
export default async function Page() {
  return (
    <main className="flex h-[80vh] w-full flex-col items-center justify-center overflow-hidden p-4 md:px-12">
      <EmptyState />
    </main>
  );
}
