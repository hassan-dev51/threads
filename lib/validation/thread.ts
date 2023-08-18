import * as z from "zod";

export const threadValidation = z.object({
  thread: z
    .string()
    .nonempty()
    .min(3, { message: "Thread at least 3 characters" }),
  accountId: z.string().nonempty(),
});

export const commentValidation = z.object({
  thread: z
    .string()
    .nonempty()
    .min(3, { message: "comment at least 3 characters" }),
});
