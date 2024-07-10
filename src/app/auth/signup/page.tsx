import CardWrapper from "@/components/auth/CardWrapper";
import SignupForm from "@/components/form/signup-form";
import { getAllBreeds } from "@/data/breed";
import { Breed } from "@prisma/client";

export const metadata = {
  title: "Sign Up",
};

export default async function Page() {
  return (
    <CardWrapper
      title="Sign up"
      description="Join us! Create your account to get started and enjoy exclusive benefits."
      backButtonHref="/auth/signin"
      backButtonLabel="Back to Sign in"
      showSocial={true}
    >
      <SignupForm />
    </CardWrapper>
  );
}
