import { User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UserProfileDialog({ user }: { user: User }) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-4">
      <div className="h-12 w-12 overflow-hidden rounded-full">
        <Image
          src={user.image || ""}
          alt="Avatar"
          height={50}
          width={50}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="grid gap-1">
        <div
          onClick={() => router.push(`/profile/${user.id}`)}
          className="cursor-pointer font-medium hover:underline hover:underline-offset-4"
        >
          {user.name}
        </div>
        <div className="text-muted-foreground">Daisy</div>
      </div>
    </div>
  );
}
