"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();

  return (
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
  );
};

export default Navigation;
