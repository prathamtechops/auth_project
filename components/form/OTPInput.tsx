import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OTPFormProps {
  name: string;
  label: string;
  description: string;
  maxLenght: number;
  form: any;
  disable: boolean;
}

const OTPInput = ({
  name,
  label,
  description,
  maxLenght,
  form,
  disable,
}: OTPFormProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <InputOTP disabled={disable} maxLength={maxLenght} {...field}>
              <InputOTPGroup>
                {Array.from({ length: maxLenght }).map((_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default OTPInput;
