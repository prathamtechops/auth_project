import LogoutButton from "@/app/(protected)/_components/LogoutButton";
import getUser from "@/lib/getCurrentUser";
import { AvatarImage } from "@radix-ui/react-avatar";
import { FaUser } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const UserButton = async () => {
  const user = await getUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback>
            <FaUser />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <LogoutButton>
          <DropdownMenuItem>
            <RxExit className="mr-2 size-4" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
