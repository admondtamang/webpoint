import {
  createUserSchema,
  getAllSchema,
  loginSchema,
} from "@/server/schema/user.schema";
import { genHash } from "@/utils/hash";
import { trpc } from "@/utils/trpc";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";
import argon2 from "argon2";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = router({
  getAll: protectedProcedure
    .input(getAllSchema)
    .query(async ({ input, ctx }) => {
      const data = await ctx.prisma.user.findMany({
        where: {
          url: {
            contains: input.url,
          },
        },
        take: 10,
      });

      return data;
    }),
  login: publicProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const { username, password } = input;

    const user = await ctx.prisma.user.findFirst({
      where: { username },
    });

    if (!user)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "account not found",
      });

    const hashed = await genHash(password);
    const verifyHash = await argon2.verify(user.password, hashed);

    if (!verifyHash)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "account or password not found",
      });

    return {
      success: true,
      message: `Hello ${input?.username ?? "world"}`,
    };
  }),
  signup: publicProcedure
    .input(createUserSchema) // input validation
    .mutation(async ({ input, ctx }) => {
      const { username, password, url } = input;

      // generate password hash
      const hash = await genHash(password);
      console.log(input);

      // create user
      try {
        const user = await ctx.prisma.user.create({
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
      } catch (e) {
        console.log(e);
        if (e instanceof PrismaClientKnownRequestError)
          if (e.code === "P2002") {
            throw new TRPCError({
              cause: e,
              code: "CONFLICT",
              message: "User already Exists",
            });
          }
        // Another error occured
        console.error(e);
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),
});
