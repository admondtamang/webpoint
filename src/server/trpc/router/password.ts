import { createUserSchema, getAllSchema } from "@/server/schema/user.schema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const passwordRouter = router({
  getAll: publicProcedure.input(getAllSchema).query(async ({ input, ctx }) => {
    // social / actual user

    const find = ctx.session?.user?.id
      ? { id: ctx.session.user.id }
      : { username: input.uniqueUserName };
    console.log(find, input.uniqueUserName);

    const user = await ctx.prisma.user.findFirst({
      where: find,
    });

    if (!user)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "account not found",
      });

    const data = await ctx.prisma.passwordList.findMany({
      where: {
        userId: user.id,
        url: {
          contains: input.url,
        },
      },
      take: 10,
    });

    return data;
  }),
  addPasswordList: publicProcedure
    .input(createUserSchema) // input validation
    .mutation(async ({ input, ctx }) => {
      const { uniqueUserName, username, password, url } = input;

      const find = ctx.session?.user?.id
        ? { id: ctx.session.user.id }
        : { username: input.uniqueUserName };

      const user = await ctx.prisma.user.findFirst({
        where: find,
      });

      if (!user) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Cannot find user ",
        });
      }

      // create new password
      try {
        const passwordList = await ctx.prisma.passwordList.create({
          data: {
            username: username,
            password,
            userId: user.id,
            url: url || "",
          },
        });

        return {
          passwordList,
          message: "URl created",
        };
      } catch (e: any) {
        if (e instanceof PrismaClientKnownRequestError)
          if (e?.code === "P2002") {
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
