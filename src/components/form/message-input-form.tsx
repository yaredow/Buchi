"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MessageInputSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { CldUploadWidget } from "next-cloudinary";
import { ImageUp } from "lucide-react";

export default function MessageInputForm({
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
      body: JSON.stringify({
        body: values.body,
        conversationId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    form.reset();
  };

  const handleUpload = async (result: any) => {
    await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({ image: result?.info?.url, conversationId }),
    });
  };

  return (
    <div className="flex w-full items-center justify-center border-t p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-row items-center gap-4"
        >
          <CldUploadWidget
            options={{ maxFiles: 6 }}
            onSuccess={handleUpload}
            uploadPreset="doggo-chat"
          >
            {({ open }) => {
              return (
                <button className="gap-2 border-2" onClick={() => open()}>
                  <ImageUp />
                </button>
              );
            }}
          </CldUploadWidget>

          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Type your message here"
                    type="text"
                    className="w-full"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">
            <PaperPlaneIcon />
          </Button>
        </form>
      </Form>
    </div>
  );
}
