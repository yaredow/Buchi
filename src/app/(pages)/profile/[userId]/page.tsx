import UserProfile from "@/components/profile/user-profile";

export default async function Page({ params }: { params: { userId: string } }) {
  const { userId } = params;

  return <UserProfile userId={userId} />;
}
