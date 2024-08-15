import UserButton from "@/components/UserButton";
import Navigation from "./Navigation";

const Navbar = () => {
  return (
    <div className="flex w-[600px] items-center justify-between rounded-xl bg-secondary p-4 shadow-sm">
      <Navigation />
      <UserButton />
    </div>
  );
};

export default Navbar;
