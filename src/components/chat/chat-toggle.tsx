import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquareText } from "lucide-react";

export default function ChatToggle() {
  return (
    <Button variant="outline" size="icon" asChild>
      <Link href="/chat">
        <MessageSquareText strokeWidth={1.5} size={20} />
      </Link>
    </Button>
  );
}
