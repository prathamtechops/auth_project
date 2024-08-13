import { CardWrapper } from "@/components/CardWrapper";

export default function Loading() {
  return (
    <CardWrapper
      headerTitle="Verification"
      backButtonLabel="Back to Login"
      // headerLabel="Confirming your email"
      headerLable="Please wait..."
      backButtonHref="/auth/login"
      showSocialLinks={false}
    >
      <div className="flex w-full items-center justify-center gap-x-2">
        <div className="bounce-delay-0 size-4 animate-pulse rounded-full bg-neutral-400"></div>
        <div className="bounce-delay-1 size-4 animate-pulse rounded-full bg-neutral-400"></div>
        <div className="bounce-delay-2 size-4 animate-pulse rounded-full bg-neutral-400"></div>
      </div>
    </CardWrapper>
  );
}
