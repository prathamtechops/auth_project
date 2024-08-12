"use client";

import { reset } from "@/lib/action/auth.action";
import { resetSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CardWrapper } from "../CardWrapper";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import FormMessage from "./FormMessage";
import InputField from "./InputField";

function ResetForm() {
  const [type, setType] = useState<"error" | "success" | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof resetSchema>) {
    setMessage(null);
    setType(null);

    try {
      const res = await reset(values);

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
      headerTitle="Password Reset"
      headerLable="Forgot your password?"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
      showSocialLinks={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            name="email"
            label="Email"
            placeholder="Email"
            type="email"
            form={form}
            disable={form.formState.isSubmitting}
          />

          <FormMessage message={message} type={type} />
          <Button
            isLoading={form.formState.isSubmitting}
            type="submit"
            className="w-full"
          >
            Send Reset Mail
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default ResetForm;
