import { createUserSchema, loginSchema } from "@/server/schema/user.schema";
import { genHash } from "@/utils/hash";
import argon2 from "argon2";

import { router, publicProcedure } from "../trpc";

export const userRouter = router({
  login: publicProcedure.input(loginSchema).query(async ({ input, ctx }) => {
    const { username, password } = input;

    const user = await ctx.prisma.user.findFirst({
      where: { username },
    });

    const hashed = await genHash(password);
    if (!user || !argon2.verify(user.password, hashed)) return null;

    return {
      greeting: `Hello ${input?.username ?? "world"}`,
    };
  }),
  signup: publicProcedure
    .input(createUserSchema) // input validation
    .query(async ({ input, ctx }) => {
      const { username, password, url } = input;

      // generate password hash
      const hash = await genHash(password);

      // create user
      const user = ctx.prisma.user.create({
        data: {
          username,
          password: hash,
          url,
        },
      });

      return {
        user,
        message: "user created",
      };
    }),
});
