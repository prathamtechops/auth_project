import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Switch } from "../ui/switch";

interface FromProps {
  name: string;
  label: string;
  form: any;
  disable: boolean;
  description: string;
}

const SwitchInput = ({
  name,
  label,
  form,
  disable,
  description,
}: FromProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-md">
          <div className="space-y-0.5">
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <FormControl>
            <Switch
              disabled={disable}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SwitchInput;
