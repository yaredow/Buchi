import UserProfile from "@/components/profile/user-profile";
import { getUserByEmail } from "@/data/user";
import { User } from "@prisma/client";

export default async function Page({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const user = (await getUserByEmail(userId)) as User;

  return <UserProfile user={user} />;
}
