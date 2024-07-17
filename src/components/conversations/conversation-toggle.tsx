import { ChatBubbleIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "../ui/button";

export default function ConversationToggle() {
  return (
    <div>
      <Link href="/conversations">
        <Button className="rounded-full" size="icon" variant="outline">
          <ChatBubbleIcon />
        </Button>
      </Link>
    </div>
  );
}
