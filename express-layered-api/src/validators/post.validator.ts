import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 chars"),
  content: z.string().min(10, "Content must be at least 10 chars"),
  author: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const updatePostSchema = z.object({
  title: z.string().min(3).optional(),
  content: z.string().min(10).optional(),
  author: z.string().optional(),
  tags: z.array(z.string()).optional(),
});
