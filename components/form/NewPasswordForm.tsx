"use client";

import { newPassword } from "@/lib/action/auth.action";
import { newPasswordSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CardWrapper } from "../CardWrapper";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import FormMessage from "./FormMessage";
import PasswordInput from "./PasswordInput";

function NewPasswordForm({ token }: { token?: string }) {
  const [type, setType] = useState<"error" | "success" | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof newPasswordSchema>) {
    setMessage(null);
    setType(null);

    if (!token) {
      setMessage("Invalid token");
      setType("error");
      return;
    }

    try {
      const res = await newPassword(values, token);

      if (res?.success) {
        setType("success");
        setMessage(res?.success);
      }

      form.reset();
    } catch (error) {
      setType("error");
      setMessage(error instanceof Error ? error.message : "Unknown error");
    }
  }

  return (
    <CardWrapper
      headerTitle="New Password"
      headerLable="Enter your new password"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
      showSocialLinks={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <PasswordInput
            name="password"
            label="Password"
            placeholder="******"
            form={form}
            disable={form.formState.isSubmitting}
          />

          <FormMessage message={message} type={type} />
          <Button
            isLoading={form.formState.isSubmitting}
            type="submit"
            className="w-full"
          >
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default NewPasswordForm;
