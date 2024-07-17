import { ChatLayout } from "@/components/chat/chat-layout";
import { cookies } from "next/headers";

export default function Home() {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  return (
    <main className="fixed inset-0 my-8 flex h-[calc(100dvh)] flex-col items-center justify-center gap-4 p-4 py-16 md:px-12">
      <div className="z-10 h-full w-full max-w-5xl rounded-lg border text-sm lg:flex">
        <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
      </div>
    </main>
  );
}
