"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import SubmitButton from "../SubmitButton";
import { FormSuccess } from "../FormSuccess";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { authenticate } from "@/server/actions/auth/actions";
import { FormError } from "../FormError";
import { SigninFormSchema } from "@/lib/schema";

export default function SigninForm() {
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already used with different provider"
      : "";

  const form = useForm<z.infer<typeof SigninFormSchema>>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SigninFormSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      authenticate(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
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
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex-grow items-center justify-center gap-4"
      >
        <div className="flex flex-col space-y-6">
          {!showTwoFactor && (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          data-testid="email"
                          disabled={isPending}
                          {...field}
                          placeholder="Email"
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
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          data-testid="password"
                          disabled={isPending}
                          {...field}
                          placeholder="Password"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage className="mx-2" />
                    </FormItem>
                  );
                }}
              />
            </>
          )}

          {showTwoFactor && (
            <FormField
              control={form.control}
              name="twoFactor"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="Two Factor code"
                      />
                    </FormControl>
                    <FormMessage className="mx-2" />
                  </FormItem>
                );
              }}
            />
          )}

          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <SubmitButton isPending={isPending} />
        </div>
      </form>
    </Form>
  );
}
