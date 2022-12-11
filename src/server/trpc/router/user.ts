import {
  createUserSchema,
  getAllSchema,
  loginSchema,
} from "@/server/schema/user.schema";
import { genHash } from "@/utils/hash";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = router({
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

    const verifyHash = await argon2.verify(user.password, password);

    if (!verifyHash)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "account or password not found",
      });

    // generate token
    const token = await jwt.sign(
      {
        user,
        exp: (Date.now() / 1000 + (3000 || 300) * 60, 10),
      },
      "JWT_SECRET"
    );

    return {
      success: true,
      token,
      user,
      message: `Hello ${input?.username ?? "world"}`,
    };
  }),

  signup: publicProcedure
    .input(createUserSchema) // input validation
    .mutation(async ({ input, ctx }) => {
      const { username, password } = input;

      // generate password hash
      const hash = await genHash(password);

      // create user
      try {
        const user = await ctx.prisma.user.create({
          data: {
            username,
            password: hash,
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
