"use client";
import { threadValidation } from "@/lib/validation/thread";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { createthread } from "@/lib/actions/thread.action";
import { z } from "zod";

type Props = {
  userId: string;
};

const PostThread = ({ userId }: Props) => {
  const path = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(threadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const postThread = async (values: z.infer<typeof threadValidation>) => {
    await createthread({
      text: values.thread,
      author: userId,
      communityId: null,
      path: path,
    });
    router.push("/");
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(postThread)}
          className="mt-10 flex flex-col justify-start gap-10"
        >
          <FormField
            name="thread"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  Content
                </FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Textarea rows={15} {...field}></Textarea>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-primary-500 w-full">
            Post
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PostThread;
