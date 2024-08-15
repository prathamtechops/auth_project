import { Toaster } from "@/components/ui/sonner";
import React from "react";
import Navbar from "./_components/Navbar";
const ProtecedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-6 duration-1000 animate-in fade-in">
      <Navbar />
      {children}
      <Toaster />
    </div>
  );
};

export default ProtecedLayout;
