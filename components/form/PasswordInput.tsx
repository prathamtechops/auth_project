import React from "react";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

interface FromProps {
  name: string;
  label: string;
  placeholder?: string;
  form: any;
  disable: boolean;
}

const PasswordInput = ({
  name,
  label,
  placeholder,
  form,
  disable,
}: FromProps) => {
  const [show, setShow] = React.useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={show ? "text" : "password"}
                placeholder={placeholder}
                disabled={disable}
                {...field}
              />
              <Button
                className="absolute inset-y-0 right-0 flex select-none items-center px-2"
                variant="link"
                type="button"
                onClick={() => setShow(!show)}
              >
                {show ? (
                  <FaRegEyeSlash className="size-5" />
                ) : (
                  <FaRegEye className="size-5" />
                )}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordInput;
