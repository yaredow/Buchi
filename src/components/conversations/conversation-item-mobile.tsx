import Link from "next/link";
import { FullConversationType } from "@/app/types/conversation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ConversationItemMobileProps = {
  conversationId: string;
  conversation: FullConversationType;
};

export default function ConversationItemMobile({
  conversationId,
  conversation,
}: ConversationItemMobileProps) {
  return (
    <Link href={`/conversations/${conversationId}`} className="max-w-12">
      <div className="flex flex-col gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Hover</TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </Link>
  );
}
