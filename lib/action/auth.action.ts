"use server";

import { signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_ROUTE } from "@/routes";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";
import { db } from "../db";
import {
  sendPasswordResetEmail,
  sendTwoFactorTokenEmail,
  sendVerificationEmail,
} from "../mail";
import {
  loginSchema,
  newPasswordSchema,
  registerSchema,
  resetSchema,
} from "../schema";
import {
  generatePasswordResetToken,
  generateTwoFactorToken,
  generateVerificationToken,
  getPasswordResetTokenByToken,
  getTwoFactorConfirmationByUserId,
  getTwoFactorTokenByEmail,
  getUserByEmail,
  getVerificationTokenByToken,
} from "../utils";

export const login = async (values: z.infer<typeof loginSchema>) => {
  try {
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
      throw new Error("Invalid email or password");
    }

    const { email, password, code } = validatedFields.data;

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

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
      if (code) {
        const twoFactorToken = await getTwoFactorTokenByEmail(
          existingUser.email
        );
        if (!twoFactorToken) {
          throw new Error("Invalid two factor token");
        }

        if (twoFactorToken.token !== code) {
          throw new Error("Invalid two factor token");
        }

        const hasExpired = new Date(twoFactorToken.expires) < new Date();
        if (hasExpired) {
          throw new Error("Two factor token has expired");
        }

        await db.twoFactorToken.delete({
          where: { id: twoFactorToken.id },
        });

        const existingConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (existingConfirmation) {
          await db.twoFactorConfirmation.delete({
            where: { id: existingConfirmation.id },
          });
        }

        await db.twoFactorConfirmation.create({
          data: {
            userId: existingUser.id,
          },
        });
      } else {
        const twoFactorToken = await generateTwoFactorToken(existingUser.email);

        if (!twoFactorToken) {
          throw new Error("Failed to generate two factor token");
        }

        await sendTwoFactorTokenEmail(existingUser.email, twoFactorToken.token);

        return {
          success: "Two Factor Authentication Email Sent",
          twoFactor: true,
        };
      }
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
      return { message: "Token has expired", success: false };
    }

    const user = await getUserByEmail(existingToken.email);

    if (!user) {
      return { message: "User not found", success: false };
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

    return { message: "Email verified", success: true };
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

export const logout = async () => {
  await signOut({
    redirectTo: "/auth/login",
  });
};
