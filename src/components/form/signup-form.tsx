"use client";

import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import SubmitButton from "../SubmitButton";
import { FormSuccess } from "../FormSuccess";
import { FormError } from "../FormError";
import { registerAction } from "@/server/actions/auth/actions";
import { SignupFormSchema } from "@/lib/schema";
import { dogBreeds } from "@/lib/constants";
import { MultiSelect } from "@/components/ui/multi-select";
import { useForm } from "react-hook-form";

export default function SignupForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      breed: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof SignupFormSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      registerAction(values)
        .then((data) => {
          if (data.success) {
            setSuccess(data.success);
            form.reset();
          } else {
            setError(data.error);
          }
        })
        .catch((error) => {
          console.error(error);
          setError("Something went wrong");
        });
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-grow items-center justify-center gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-col space-y-6">
          <div className="flex flex-row gap-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="First Name"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage className="mx-2" />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="Last Name"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage className="mx-2" />
                  </FormItem>
                );
              }}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="Email"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage className="mx-2" />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage className="mx-2" />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="Confirm Password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage className="mx-2" />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="breed"
            render={({ field }) => (
              <FormItem>
                <MultiSelect
                  selected={field.value || []}
                  options={dogBreeds}
                  {...field}
                  className="sm:w-[510px]"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormSuccess message={success} />
          <FormError message={error} />
          <SubmitButton isPending={isPending} />
        </div>
      </form>
    </Form>
  );
}
