import { Resend } from "resend";

const resnd = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resnd.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email",
    html: `<a href="${confirmLink}">Click here to confirm your email</a>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resnd.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<a href="${resetLink}">Click here to reset your password</a>`,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resnd.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Two Factor Authentication",
    html: `<p>${token}</p>`,
  });
};
