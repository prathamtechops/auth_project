import LoginButton from "@/components/actions/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default async function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center  duration-1000 animate-in fade-in">
      <div className="space-y-6 text-center">
        <h1 className={cn("gradient-header", font.className)}>Auth</h1>
        <p className="text-2xl">A Simple Authentication Service</p>
      </div>
      <LoginButton>
        <Button variant="secondary" size="lg">
          Get Started
        </Button>
      </LoginButton>
    </main>
  );
}
