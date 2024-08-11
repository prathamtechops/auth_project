import Link from "next/link";
import { Button } from "./ui/button";

interface BackButtonProps {
  href: string;
  label: string;
}

const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button
      variant="link"
      className="w-full font-normal text-muted-foreground"
      size="sm"
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
