import z, { string } from "zod";

export const createUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  url: z.string().optional(),
  uniqueUserName: z.string().optional(),
});

export const createUserGeneratedSchema = z.object({
  url: z.string(),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const getAllSchema = z.object({
  url: z.string(),
  uniqueUserName: z.string().optional(),
  username: z.string().optional(),
});
// export const getAllOutputSchema = z.TypeOf<typeof Cre>
export type CreateUserInput = z.TypeOf<typeof createUserSchema>;
export type LoginInput = z.TypeOf<typeof loginSchema>;
