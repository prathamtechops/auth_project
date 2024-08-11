import { cn } from "@/lib/utils";
import { FaRegCheckCircle } from "react-icons/fa";
import { LuAlertTriangle } from "react-icons/lu";

interface FormMessageProps {
  message?: string | null;
  type?: "error" | "success" | null;
  className?: string;
}
const FormMessage = ({ message, type, className }: FormMessageProps) => {
  if (!message || !type) {
    return null;
  }

  return (
    <div
      className={cn(
        "p-3 rounded-md  flex items-center gap-x-2 text-sm",
        {
          "text-destructive": type === "error",
          "bg-destructive/30": type === "error",
          "text-emerald-500": type === "success",
          "bg-emerald-500/15": type === "success",
        },
        className
      )}
    >
      {type === "success" ? (
        <FaRegCheckCircle className="size-4" />
      ) : (
        <LuAlertTriangle className="size-4" />
      )}

      {message}
    </div>
  );
};

export default FormMessage;
