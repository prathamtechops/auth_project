"use client";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { DEFAULT_LOGIN_ROUTE } from "@/routes";
import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

const SocialButtons = () => {
  const searchParams = useSearchParams();
  const callback = searchParams.get("callback");
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callback || DEFAULT_LOGIN_ROUTE,
    });
  };

  return (
    <div className="flex  w-full items-center justify-center gap-x-2">
      <Button
        variant="outline"
        className="w-full"
        aria-label="Log in with Google"
        onClick={() => {
          onClick("google");
        }}
      >
        <FcGoogle className="size-5" />
      </Button>
      <Button
        variant="outline"
        className="w-full"
        aria-label="Log in with Google"
        onClick={() => {
          onClick("github");
        }}
      >
        <FaGithub className="size-5" />
      </Button>
    </div>
  );
};

export default SocialButtons;
