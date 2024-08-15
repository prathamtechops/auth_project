import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getAccountById } from "./lib/action/auth.action";
import { db } from "./lib/db";
import { getTwoFactorConfirmationByUserId, getUserById } from "./lib/utils";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user, account }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);
      if (!user) return token;

      const account = await getAccountById(user.id);

      token.isOAuth = !!account;
      token.name = user.name;
      token.email = user.email;
      token.role = user.role;
      token.isTwoFactorEnabled = user.isTwoFactorEnabled;

      return token;
    },
    async session({ session, token }) {
      if (!session.user) return session;

      if (token.sub) session.user.id = token.sub;
      if (token.role) session.user.role = token.role as UserRole;
      if (token.email) session.user.email = token.email;
      if (token.name) session.user.name = token.name;

      session.user.isOAuth = token.isOAuth as boolean;
      session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;

      return session;
    },

    async signIn({ user, account }) {
      if (user.id) {
        if (account?.provider !== "credentials") return true;

        const existingUser = await getUserById(user.id);

        if (!existingUser || !existingUser.emailVerified) {
          return false;
        }

        if (existingUser.isTwoFactorEnabled) {
          const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
            user.id
          );

          if (!twoFactorConfirmation) {
            return false;
          }

          await db.twoFactorConfirmation.delete({
            where: { id: twoFactorConfirmation.id },
          });
        }
      }

      return true;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
