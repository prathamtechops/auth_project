"use client";

import FormMessage from "@/components/form/FormMessage";
import InputField from "@/components/form/InputField";
import PasswordInput from "@/components/form/PasswordInput";
import SelectInput from "@/components/form/SelectInput";
import SwitchInput from "@/components/form/SwitchInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { settings } from "@/lib/action/auth.action";
import { settingsSchema } from "@/lib/schema";
import { ExtendedUser } from "@/next-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function SettingsForm({ user }: { user: ExtendedUser | undefined }) {
  const [type, setType] = useState<"error" | "success" | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  if (!user) {
    setMessage("User not found");
    setType("error");
  }

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof settingsSchema>) {
    setMessage(null);
    setType(null);

    try {
      const res = await settings(values);

      if (res?.success) {
        setType("success");
        setMessage(res?.message);
      }
    } catch (error) {
      setType("error");
      setMessage(error instanceof Error ? error.message : "Unknown error");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          name="name"
          label="Name"
          placeholder="Name"
          form={form}
          disable={form.formState.isSubmitting}
        />
        {user?.isOAuth === false && (
          <>
            <InputField
              name="email"
              label="Email"
              placeholder="jGwR8@example.com"
              form={form}
              disable={form.formState.isSubmitting}
            />
            <div className="grid grid-cols-2 gap-4">
              <PasswordInput
                name="password"
                label="Password"
                placeholder="********"
                form={form}
                disable={form.formState.isSubmitting}
              />

              <PasswordInput
                name="newPassword"
                label="New Password"
                placeholder="********"
                form={form}
                disable={form.formState.isSubmitting}
              />
            </div>
          </>
        )}

        <SelectInput
          name="role"
          label="Role"
          placeholder="Select a Role"
          form={form}
          disable={form.formState.isSubmitting}
        />

        {user?.isOAuth === false && (
          <SwitchInput
            name="isTwoFactorEnabled"
            label="Two Factor Authentication"
            form={form}
            disable={form.formState.isSubmitting}
            description="Enable Two Factor Authentication"
          />
        )}

        <FormMessage message={message} type={type} />
        <Button
          isLoading={form.formState.isSubmitting}
          type="submit"
          className="w-full"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default SettingsForm;
