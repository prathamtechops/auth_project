import FormMessage from "@/components/form/FormMessage";
import getUser from "@/lib/getCurrentUser";
import { UserRole } from "@prisma/client";
import React from "react";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

const RoleGate = async ({ children, allowedRole }: RoleGateProps) => {
  const user = await getUser();

  const role = user?.role;

  if (role !== allowedRole)
    return (
      <FormMessage
        message="You are not authorized to access this page"
        type="error"
      />
    );

  return <>{children}</>;
};

export default RoleGate;
