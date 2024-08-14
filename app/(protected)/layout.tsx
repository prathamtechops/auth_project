import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import React from "react";
import Navbar from "./_components/Navbar";
const ProtecedLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="flex size-full flex-col items-center justify-center gap-6 duration-1000 animate-in fade-in">
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  );
};

export default ProtecedLayout;
