import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex size-full items-center justify-center duration-1000 animate-in fade-in">
      {children}
    </div>
  );
};

export default AuthLayout;
