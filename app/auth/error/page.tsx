import { CardWrapper } from "@/components/CardWrapper";
import FormMessage from "@/components/form/FormMessage";

const Page = () => {
  return (
    <CardWrapper
      headerLable="Something went wrong"
      backButtonHref="/auth/login"
      headerTitle="Oops!"
      backButtonLabel="Back to Login"
    >
      <FormMessage
        className="justify-center"
        message="Something went wrong! Please try again"
        type="error"
      />
    </CardWrapper>
  );
};

export default Page;
