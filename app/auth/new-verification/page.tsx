import { CardWrapper } from "@/components/CardWrapper";
import { VerifyToken } from "@/components/VerifyToken";

const NewVerification = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  const token = searchParams?.token;

  return (
    <CardWrapper
      headerTitle="Verification"
      backButtonLabel="Back to Login"
      // headerLabel="Confirming your email"
      headerLable="Confirming your email"
      backButtonHref="/auth/login"
      showSocialLinks={false}
    >
      <VerifyToken token={token} />
    </CardWrapper>
  );
};

export default NewVerification;
