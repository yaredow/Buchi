import { formatDate } from "@/lib/helpers";
import { Message } from "@prisma/client";

type MessageItemProps = {
  message: Message;
};

export default function MessageItem({ message }: MessageItemProps) {
  const { body, createdAt } = message;

  return (
    <div className="mb-4 flex justify-start">
      <div className="flex max-w-xs flex-col rounded-lg bg-white p-2 shadow dark:bg-slate-800">
        <span>{body}</span>
        <span className="self-end text-xs text-gray-500">
          {formatDate(createdAt)}
        </span>
      </div>
    </div>
  );
}
