"use client";

import { verifyToken } from "@/lib/action/auth.action";
import { useCallback, useEffect, useState } from "react";
import FormMessage from "./form/FormMessage";

export const VerifyToken = ({ token }: { token: string | undefined }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<"error" | "success" | null>(null);

  const verify = useCallback(async () => {
    if (message && type) return;

    if (token === undefined) {
      setMessage("Token is Missing");
      setType("error");
      return;
    }
    try {
      const res = await verifyToken(token);

      if (res.success) {
        setMessage(res.success);
        setType("success");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unknown error");
      setType("error");
    }
  }, [token]);

  useEffect(() => {
    verify();
  }, [verify]);

  if (message && type) return <FormMessage type={type} message={message} />;

  return (
    <div className="flex w-full items-center justify-center gap-x-2">
      <div className="bounce-delay-0 size-4 animate-pulse rounded-full bg-neutral-400"></div>
      <div className="bounce-delay-1 size-4 animate-pulse rounded-full bg-neutral-400"></div>
      <div className="bounce-delay-2 size-4 animate-pulse rounded-full bg-neutral-400"></div>
    </div>
  );
};
