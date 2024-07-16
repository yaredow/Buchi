"use client";

import React, { useState, useTransition } from "react";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MessageInputSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export default function MessageInput() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof MessageInputSchema>>({
    resolver: zodResolver(MessageInputSchema),
    defaultValues: {
      body: "",
    },
  });

  const onSubmit = () => {
    startTransition(() => {});
  };

  return (
    <div className="flex w-full items-center justify-center border-t p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="Type your message here"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage className="mx-2" />
                </FormItem>
              );
            }}
          />
        </form>
      </Form>
    </div>
  );
}
