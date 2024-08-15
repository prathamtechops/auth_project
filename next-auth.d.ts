/* eslint-disable no-unused-vars */
import { UserRole } from "@prisma/client";
import { type DefaultSession } from "next-auth";

// eslint-disable-next-line dot-notation
export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
