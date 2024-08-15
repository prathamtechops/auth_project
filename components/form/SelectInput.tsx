import { UserRole } from "@prisma/client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface FromProps {
  name: string;
  label: string;
  placeholder?: string;
  form: any;
  type?: string;
  disable: boolean;
}

const SelectInput = ({
  name,
  label,
  placeholder,
  form,
  type = "text",
  disable,
}: FromProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            disabled={disable}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value={UserRole.USER}>User</SelectItem>
              <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectInput;
