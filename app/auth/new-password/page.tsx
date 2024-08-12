import NewPasswordForm from "@/components/form/NewPasswordForm";

const ResetPasswordVerify = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  const token = searchParams?.token;

  return <NewPasswordForm token={token} />;
};

export default ResetPasswordVerify;
