import { CardWrapper } from "@/components/CardWrapper";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <CardWrapper
      headerTitle="Login"
      headerLable="Sign in to your account"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocialLinks={true}
    >
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <div className="flex  gap-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </CardWrapper>
  );
}
