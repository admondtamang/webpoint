import z from "zod";

export const createUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  url: z.string(),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});
