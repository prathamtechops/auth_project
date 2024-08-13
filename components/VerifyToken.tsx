import { verifyToken } from "@/lib/action/auth.action";

import FormMessage from "./form/FormMessage";

export const VerifyToken = async ({ token }: { token: string | undefined }) => {
  let res = null;
  let message = null;
  let type: "success" | "error" | null = null;
  if (token) {
    res = await verifyToken(token);
    message = res?.message;
    type = res?.success ? "success" : "error";
  } else {
    message = "Invalid token";
    type = "error";
  }

  if (message && type) return <FormMessage type={type} message={message} />;

  return (
    <div className="flex w-full items-center justify-center gap-x-2">
      <div className="bounce-delay-0 size-4 animate-pulse rounded-full bg-neutral-400"></div>
      <div className="bounce-delay-1 size-4 animate-pulse rounded-full bg-neutral-400"></div>
      <div className="bounce-delay-2 size-4 animate-pulse rounded-full bg-neutral-400"></div>
    </div>
  );
};
