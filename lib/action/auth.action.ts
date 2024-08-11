"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_ROUTE } from "@/routes";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";
import { db } from "../db";
import { loginSchema, registerSchema } from "../schema";
import { getUserByEmail } from "../utils";

export const login = async (values: z.infer<typeof loginSchema>) => {
  try {
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
      throw new Error("Invalid email or password");
    }

    const { email, password } = validatedFields.data;

    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_ROUTE,
    });

    return { success: "Email Sent" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Invalid email or password");
        default:
          throw new Error("Unknown error");
      }
    }

    throw error;
  }
};
export const register = async (values: z.infer<typeof registerSchema>) => {
  try {
    const validatedFields = registerSchema.safeParse(values);

    if (!validatedFields.success) {
      throw new Error("Invalid email or password");
    }

    const { email, password, name } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // TODO: Varification

    return { success: "Email Sent" };
  } catch (error) {
    // console.error(error);
    // throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};
