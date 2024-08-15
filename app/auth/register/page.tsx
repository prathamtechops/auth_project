import RegisterForm from "@/components/form/RegisterForm";
import { Suspense } from "react";

function Register() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}

export default Register;
