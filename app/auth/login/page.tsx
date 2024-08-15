import LoginForm from "@/components/form/LoginForm";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <LoginForm />
    </Suspense>
  );
};

export default Page;
