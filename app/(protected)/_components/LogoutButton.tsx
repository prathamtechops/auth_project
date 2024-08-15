"use client";
import { logout } from "@/lib/action/auth.action";
import React from "react";

const LogoutButton = ({ children }: { children: React.ReactNode }) => {
  const onClick = async () => {
    await logout();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LogoutButton;
