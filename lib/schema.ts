import { UserRole } from "@prisma/client";
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email is invalid" }),
  password: z.string().min(1, { message: "Password is required" }),
  code: z.optional(z.string()),
});

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email is invalid" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().min(1, { message: "Name is required" }),
});

export const resetSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email is invalid" }),
});

export const newPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const settingsSchema = z
  .object({
    name: z.optional(z.string().min(1, { message: "Name is required" })),
    email: z.optional(z.string().email({ message: "Email is invalid" })),
    password: z.optional(
      z.string().min(6, { message: "Password is required" })
    ),
    newPassword: z.optional(
      z.string().min(6, { message: "Password is required" })
    ),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.optional(z.enum([UserRole.USER, UserRole.ADMIN])),
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      if (!data.newPassword && data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required",
      path: ["newPassword"],
    }
  );
