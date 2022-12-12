import NextAuth, { type NextAuthOptions } from "next-auth";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import DiscordProvider from "next-auth/providers/discord";
import { prisma } from "../../../server/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { TRPCError } from "@trpc/server";
import argon2 from "argon2";

export const authOptions: NextAuthOptions = {
  // Include user.id on session

  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  // secret: process.env.NEXTAUTH_SECRET,

  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "1051391387507109918",
      clientSecret:
        process.env.DISCORD_CLIENT_SECRET || "RpO4QtawM_teMlDiBd3DEQsCYjZFWdqW",
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        // find user
        const user = await prisma.user.findFirst({
          where: { username },
        });

        if (!user)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "account not found",
          });

        // compare password
        const verifyHash = await argon2.verify(user.password, password);

        if (!verifyHash)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "account or password not found",
          });

        if (!user) return null;
        console.log(user);

        return user;
      },
    }),
  ],
};

export default NextAuth(authOptions);
