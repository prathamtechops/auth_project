"use client";

import { register } from "@/lib/action/auth.action";
import { registerSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CardWrapper } from "../CardWrapper";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import FormMessage from "./FormMessage";
import InputField from "./InputField";
import PasswordInput from "./PasswordInput";

function RegisterForm() {
  const [type, setType] = useState<"error" | "success" | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setType(null);
    setMessage(null);

    try {
      const res = await register(values);

      if (res.success) {
        setType("success");
        setMessage(res.success);
      }
      form.reset();
    } catch (error) {
      setType("error");
      setMessage(error instanceof Error ? error.message : "Unknown error");
    }
  }

  return (
    <CardWrapper
      headerTitle="Register"
      headerLable="Create a new account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocialLinks={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            name="name"
            label="Name"
            type="text"
            placeholder="Name"
            form={form}
            disable={form.formState.isSubmitting}
          />

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
          <FormMessage message={message} type={type} />
          <Button
            isLoading={form.formState.isSubmitting}
            type="submit"
            className="w-full"
          >
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default RegisterForm;
