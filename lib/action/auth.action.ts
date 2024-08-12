"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_ROUTE } from "@/routes";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";
import { db } from "../db";
import { sendPasswordResetEmail, sendVerificationEmail } from "../mail";
import {
  loginSchema,
  newPasswordSchema,
  registerSchema,
  resetSchema,
} from "../schema";
import {
  generatePasswordResetToken,
  generateVerificationToken,
  getPasswordResetTokenByToken,
  getUserByEmail,
  getVerificationTokenByToken,
} from "../utils";

export const login = async (values: z.infer<typeof loginSchema>) => {
  try {
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
      throw new Error("Invalid email or password");
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.password || !existingUser.email) {
      throw new Error("Email not found");
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
        existingUser.email
      );

      if (!verificationToken) {
        throw new Error("Failed to generate verification token");
      }

      await sendVerificationEmail(existingUser.email, verificationToken.token);

      return {
        success: "Email not verified! Verification Email Sent",
      };
    }

    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_ROUTE,
    });

    return { success: "Login successful" };
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

    const verificationToken = await generateVerificationToken(email);

    if (!verificationToken) {
      throw new Error("Failed to generate verification token");
    }
    await sendVerificationEmail(
      verificationToken?.email,
      verificationToken?.token
    );

    return { success: "Confirmation Email Sent" };
  } catch (error) {
    console.error(error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const verifyToken = async (token: string) => {
  try {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
      throw new Error("Invalid token");
    }

    const hasExpired = new Date() > new Date(existingToken.expires);

    if (hasExpired) {
      throw new Error("Token has expired");
    }

    const user = await getUserByEmail(existingToken.email);

    if (!user) {
      throw new Error("Email not found");
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: new Date(),
        email: user.email,
      },
    });

    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return { success: "Email Verified" };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const reset = async (values: z.infer<typeof resetSchema>) => {
  try {
    const validatedFields = resetSchema.safeParse(values);

    if (!validatedFields.success) {
      throw new Error("Invalid email");
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      throw new Error("Email not found");
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    if (!passwordResetToken) {
      throw new Error("Failed to generate password reset token");
    }

    await sendPasswordResetEmail(
      passwordResetToken?.email,
      passwordResetToken?.token
    );

    return { success: "Reset Email sent" };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const newPassword = async (
  values: z.infer<typeof newPasswordSchema>,
  token: string
) => {
  try {
    const validatedFields = newPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
      throw new Error("Invalid password");
    }

    const { password } = validatedFields.data;

    if (!token) {
      throw new Error("Invalid token");
    }

    const passwordResetToken = await getPasswordResetTokenByToken(token);

    if (!passwordResetToken) {
      throw new Error("Invalid token");
    }

    const hasExpired = new Date() > new Date(passwordResetToken.expires);

    if (hasExpired) {
      throw new Error("Token has expired");
    }

    const existingUser = await getUserByEmail(passwordResetToken.email);

    if (!existingUser) {
      throw new Error("Email not found");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    await db.passwordResetToken.delete({
      where: {
        id: passwordResetToken.id,
      },
    });

    return { success: "Password Reset Successful" };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};
