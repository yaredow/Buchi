import UserProfile from "@/components/profile/user-profile";
import { getUserById } from "@/data/user";
import { User } from "@prisma/client";

export default async function Page({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const user = (await getUserById(userId)) as User;
  console.log(user);

  return <UserProfile user={user} />;
}
