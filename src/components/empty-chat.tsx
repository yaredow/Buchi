import EmptyImage from "@/../public/images/doggoEmpty.png";
import Image from "next/image";

const EmptyState = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <Image
        src={EmptyImage}
        alt="A kid hugging a doggo"
        width={200}
        height={200}
      />
      <div className="flex flex-col items-center text-center">
        <h3 className="mt-2 text-2xl font-semibold">Select a conversation</h3>
      </div>
    </main>
  );
};

export default EmptyState;
