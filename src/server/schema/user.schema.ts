import z, { string } from "zod";

export const createUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  url: z.string(),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const getAllSchema = z.object({ url: z.string() });
// export const getAllOutputSchema = z.TypeOf<typeof Cre>
export type CreateUserInput = z.TypeOf<typeof createUserSchema>;
export type LoginInput = z.TypeOf<typeof loginSchema>;
