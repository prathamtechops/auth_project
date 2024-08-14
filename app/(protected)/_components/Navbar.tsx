"use client";

import { Button } from "@/components/ui/button";
import UserButton from "@/components/UserButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex w-[600px] items-center justify-between rounded-xl bg-secondary p-4 shadow-sm">
      <div className="flex gap-2">
        <Button variant={pathname === "/userinfo" ? "default" : "outline"}>
          <Link href="/userinfo">User</Link>
        </Button>

        <Button variant={pathname === "/admin" ? "default" : "outline"}>
          <Link href="/admin">Admin</Link>
        </Button>
        <Button variant={pathname === "/settings" ? "default" : "outline"}>
          <Link href="/settings">Settings</Link>
        </Button>
      </div>
      <UserButton />
    </div>
  );
};

export default Navbar;
