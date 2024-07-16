"use client";

import React, { useState, useTransition } from "react";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MessageInputSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "../ui/button";

export default function MessageInput({
  conversationId,
}: {
  conversationId: string;
}) {
  const form = useForm<z.infer<typeof MessageInputSchema>>({
    resolver: zodResolver(MessageInputSchema),
    defaultValues: {
      body: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof MessageInputSchema>) => {
    const response = await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({ body: values.body, conversationId }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    const message = await response.json();
    console.log(message);
  };

  return (
    <div className="flex w-full items-center justify-center border-t p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-row gap-2"
        >
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Type your message here"
                      type="text"
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <Button type="submit">Send</Button>
        </form>
      </Form>
    </div>
  );
}
