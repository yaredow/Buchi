import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Spinner from "@/components/Spinner";
import UserProfileDialog from "@/components/user/user-profile-dialog";
import { getBreedWithSlug } from "@/data/breed";
import BreedDetails from "@/components/breed/breed-details";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return <BreedDetails slug={slug} />;
}
