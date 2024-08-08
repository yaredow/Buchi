import UserPublicProfile from "@/components/user/user-public-profile";
import { getUserById, isFollowingUser } from "@/data/user";
import { FullUserType } from "@/types/user";

type IParams = {
  userId: string;
};

export default async function Page({ params }: { params: IParams }) {
  const { userId } = params;
  const user = (await getUserById(userId)) as FullUserType;
  const isFollowing = await isFollowingUser(user.id);
  console.log(isFollowing);

  if (!user) return <div className="text-center">User not found</div>;

  return <UserPublicProfile user={user} isFollowing={isFollowing!!} />;
}
