import useGetAllUsers from "@/utils/hook/useGetAllUsers";
import { User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner";

function DogOwnerCard({ user }: { user: User }) {
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

export default function DogOwner() {
  const { users, isPending }: { users: User[]; isPending: boolean } =
    useGetAllUsers();
  return (
    <div className="my-4 flex flex-col md:my-12">
      <ul>
        {isPending ? (
          <div className="grid items-center justify-center">
            <Spinner />
          </div>
        ) : (
          users.map((user, index) => (
            <li className="flex flex-col gap-4" key={index}>
              <DogOwnerCard user={user} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
