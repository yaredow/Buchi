import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MessageInputSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "../ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import ImageUploader from "../image-uploader";

export default function MessageInputForm({
  conversationId,
}: {
  conversationId: string;
}) {
  const [files, setFiles] = useState<File[] | null>(null);
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

    form.reset();
  };

  return (
    <div className="flex w-full items-center justify-center border-t p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-row items-center gap-4"
        >
          <div>
            <ImageUploader files={files} setFiles={setFiles} />
          </div>
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
