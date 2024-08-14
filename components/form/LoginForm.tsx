"use client";

import { login } from "@/lib/action/auth.action";
import { loginSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CardWrapper } from "../CardWrapper";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import FormMessage from "./FormMessage";
import InputField from "./InputField";
import OTPInput from "./OTPInput";
import PasswordInput from "./PasswordInput";

function LoginForm() {
  const [type, setType] = useState<"error" | "success" | null>(null);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with a different provider"
      : null;

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setMessage(null);
    setType(null);

    try {
      const res = await login(values);

      if (res?.twoFactor) {
        setShowTwoFactor(true);
        setType("success");
        setMessage(res?.success);
        return
      }
      
      if (res?.success) {
        setType("success");
        setMessage(res?.success);
        form.reset();
      }
    } catch (error) {
      setType("error");
      setMessage(error instanceof Error ? error.message : "Unknown error");
    }
  }

  return (
    <CardWrapper
      headerTitle="Login"
      headerLable="Sign in to your account"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocialLinks={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {!showTwoFactor && (
            <>
              <InputField
                name="email"
                label="Email"
                placeholder="Email"
                type="email"
                form={form}
                disable={form.formState.isSubmitting}
              />
              <PasswordInput
                name="password"
                label="Password"
                placeholder="Password"
                form={form}
                disable={form.formState.isSubmitting}
              />
            </>
          )}

          {showTwoFactor && (
            <OTPInput
              name="code"
              form={form}
              label="Enter OTP"
              maxLenght={6}
              description="Enter the code sent to your email"
              disable={form.formState.isSubmitting}
            />
          )}

          <Button size="sm" variant="link">
            <Link href="/auth/reset">Forgot Password?</Link>
          </Button>

          <FormMessage message={message || urlError} type={type} />
          <Button
            isLoading={form.formState.isSubmitting}
            type="submit"
            className="w-full"
          >
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default LoginForm;
