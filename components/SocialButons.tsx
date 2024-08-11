import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Button } from "./ui/button";

const SocialButtons = () => {
  return (
    <div className="flex  w-full items-center justify-center gap-x-2">
      <Button
        variant="outline"
        className="w-full"
        aria-label="Log in with Google"
        onClick={() => {}}
      >
        <FcGoogle className="size-5" />
      </Button>
      <Button
        variant="outline"
        className="w-full"
        aria-label="Log in with Google"
        onClick={() => {}}
      >
        <FaGithub className="size-5" />
      </Button>
    </div>
  );
};

export default SocialButtons;
