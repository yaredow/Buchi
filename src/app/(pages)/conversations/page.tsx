import ConversationLayout from "@/components/conversations/conversation-layout";
import { getConversations } from "@/data/conversations";
import { cookies } from "next/headers";

export const metadata = {
  title: "Chat",
  description: "Chat with fellow dog owners",
};
export default async function Page() {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const conversations = await getConversations();

  return (
    <main className="flex h-[80vh] w-full flex-col items-center justify-center overflow-hidden p-4 md:px-12">
      <div className="min-w-5xl z-10 h-full w-full rounded-lg border text-sm lg:flex">
        <ConversationLayout
          defaultLayout={defaultLayout}
          navCollapsedSize={8}
        />
      </div>
    </main>
  );
}
