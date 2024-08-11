"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
  className?: string;
}
const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
  className,
}: LoginButtonProps) => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/auth/login");
  };
  if (mode === "modal") {
    return <span>Todo</span>;
  }

  return (
    <span onClick={handleLogin} className={cn("cursor-pointer", className)}>
      {children}
    </span>
  );
};

export default LoginButton;
