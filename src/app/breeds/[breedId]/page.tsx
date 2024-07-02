"use client";

import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { selectBreed } from "@/store/breedSlice/breedSlice";
import { Badge } from "@/components/ui/badge";
import useGetAllUsers from "@/utils/hook/useGetAllUsers";
import { User } from "@prisma/client";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { breedId: string } }) {
  const router = useRouter();
  const breedId = Number(params.breedId);
  const breed = useAppSelector(selectBreed(breedId));
  const { users, isPending }: { users: User[]; isPending: boolean } =
    useGetAllUsers();

  if (!breed) return <div>No dog breed found</div>;

  return (
    <section>
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-8">
        <div className="relative mx-4 mt-4 h-[50vh] w-full overflow-hidden">
          <Image
            alt={breed?.breedImages[0] as string}
            className="h-full w-full rounded-btn object-cover object-center"
            height={800}
            src={`/images/breeds/${breed?.breedImages[0] as string}.jpg`}
            width={1200}
          />
          <h1 className="absolute bottom-4 left-4 rounded bg-black bg-opacity-50 px-4 py-2 text-2xl font-bold text-white">
            {breed.breedName}
          </h1>
        </div>

        <div className="mt-4 w-full gap-2 space-y-4">
          <h2 className="text-lg font-semibold">{`${breed.breedName} Gallery`}</h2>
          <ul className="flex flex-row items-center gap-4">
            {breed.breedImages.map((image, index) => (
              <li key={index}>
                <Image
                  alt={breed.breedName}
                  className="rounded-btn shadow"
                  height={400}
                  src={`/images/breeds/${image}.jpg`}
                  width={800}
                  unoptimized={true}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 w-full">
          <p className="mx-2">{breed.breedLongDescription}</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold">Beagle Breeds</h2>
          <h3 className="text-lg font-bold">Beagle Traits</h3>
          <div className="flex flex-wrap gap-2">
            {breed.traits.map((trait, index) => (
              <Badge key={index}>{trait}</Badge>
            ))}
          </div>
          <h3 className="text-lg font-bold">Beagle Health</h3>
          <div className="flex flex-wrap gap-2">
            {breed.diseases.map((disease, index) => (
              <Badge key={index}>{disease}</Badge>
            ))}
          </div>

          <h3 className="text-lg font-bold">Beagle Breed Information</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold">Average Height:</h4>
              <p>{`${breed.averageHeight} cm`}</p>
            </div>
            <div>
              <h4 className="font-semibold">Average Weight:</h4>
              <p>{`${breed.averageWeight} kg`}</p>
            </div>
            <div>
              <h4 className="font-semibold">Life Expectancy:</h4>
              <p>{`${breed.lifeExpectancy} years`}</p>
            </div>
            <div>
              <h4 className="font-semibold">Temperament:</h4>
              <p>{breed.temperament}</p>
            </div>
            <div>
              <h4 className="font-semibold">Hair Shedding:</h4>
              <p>{breed.hairShedding}</p>
            </div>
            <div>
              <h4 className="font-semibold">Activity Level:</h4>
              <p>{breed.hairShedding}</p>
            </div>
            <div>
              <h4 className="font-semibold">Sociability:</h4>
              <p>{breed.sociability}</p>
            </div>
            <div>
              <h4 className="font-semibold">Intelligence:</h4>
              <p>{breed.intelligence}</p>
            </div>
            <div>
              <h4 className="font-semibold">Child Friendly:</h4>
              <p>{breed.childFriendly}</p>
            </div>
            <div>
              <h4 className="font-semibold">Care Level:</h4>
              <p>{breed.careLevel}</p>
            </div>
            <div>
              <h4 className="font-semibold">Health Problems:</h4>
              <p>{breed.healthProblems}</p>
            </div>
            <div>
              <h4 className="font-semibold">Genetic Profile:</h4>
              <p>{breed.geneticProfile}</p>
            </div>
            <div>
              <h4 className="font-semibold">Feeding Habits:</h4>
              <p>{breed.feedingHabits}</p>
            </div>
          </div>
        </div>

        <div className="my-4 flex flex-col md:my-12">
          <h2 className="text-lg font-semibold">{`Owners of ${breed.breedName}`}</h2>
          <ul>
            {isPending ? (
              <div className="grid items-center justify-center">
                <Spinner />
              </div>
            ) : (
              users.map((user, index) => (
                <li className="flex flex-col gap-4" key={index}>
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
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
