import EmptyState from "@/components/empty-chat";
import { getConversations } from "@/data/conversations";

export const metadata = {
  title: "Chat",
  description: "Chat with fellow dog owners",
};
export default async function Page() {
  const conversations = await getConversations();

  if (!conversations) return null;

  const thereAreConversations = conversations?.length > 0;

  return (
    <main className="flex h-[80vh] w-full flex-col items-center justify-center overflow-hidden md:p-4 md:px-12">
      <EmptyState thereAreConversations={thereAreConversations} />
    </main>
  );
}
