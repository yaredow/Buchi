import { formatDate } from "@/lib/helpers";
import { Message } from "@prisma/client";
import Image from "next/image";

type MessageItemProps = {
  message: Message;
};

export default function MessageItem({ message }: MessageItemProps) {
  const { body, createdAt, image } = message;

  return (
    <div className="mb-4 flex justify-start">
      {image ? (
        <div className="flex flex-col gap-2">
          <div className="relative aspect-square h-80 w-80">
            <Image
              alt="image"
              fill
              src={image}
              className="rounded-sm object-cover"
            />{" "}
          </div>
          <span className="self-end text-xs text-gray-500">
            {formatDate(createdAt)}
          </span>
        </div>
      ) : (
        <div className="flex max-w-xs flex-col rounded-lg bg-white p-2 shadow dark:bg-slate-800">
          <span>{body}</span>
          <span className="self-end text-xs text-gray-500">
            {formatDate(createdAt)}
          </span>
        </div>
      )}
    </div>
  );
}
