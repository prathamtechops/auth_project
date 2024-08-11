import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  header: string;
  label: string;
  className?: string;
}

const Header = ({ label, className, header }: HeaderProps) => {
  return (
    <header
      className={
        (cn("w-full flex-col gap-6 text-center items-center justify-center"),
        className)
      }
    >
      <h1 className={cn("gradient-header", font.className)}>{header}</h1>
      <p className="py-2 text-center text-sm text-muted-foreground">{label}</p>
    </header>
  );
};

export default Header;
