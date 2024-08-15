"use client";

import { Button } from "@/components/ui/button";
import { admin } from "@/lib/action/auth.action";
import { toast } from "sonner";

const AdminButton = () => {
  const onClick = async () => {
    try {
      const res = await admin();

      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unknown error");
    }
  };
  return (
    <Button onClick={onClick} variant="default">
      Click to test
    </Button>
  );
};

export default AdminButton;
