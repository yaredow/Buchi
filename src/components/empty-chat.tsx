import EmptyImage from "@/../public/images/doggoEmpty.png";
import Image from "next/image";

type EmptyStateProps = {
  thereAreConversations: boolean;
};

const EmptyState = ({ thereAreConversations }: EmptyStateProps) => {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      {thereAreConversations ? (
        <div className="flex flex-col">
          <Image
            src={EmptyImage}
            alt="A kid hugging a doggo"
            width={200}
            height={200}
          />
          <div className="flex flex-col items-center text-center">
            <h3 className="mt-2 text-2xl font-semibold">
              Select a conversation
            </h3>
          </div>{" "}
        </div>
      ) : (
        <div className="flex flex-col items-center text-center">
          <h3 className="mt-2 text-2xl font-semibold">No conversations yet</h3>
          <p className="text-sm text-zinc-500">
            Check a dog breed to start a conversation with the owner
          </p>
        </div>
      )}
    </main>
  );
};

export default EmptyState;
