import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface InputFormProps {
  form: ReturnType<typeof useForm<any>>;
  fields: string;
  placeholder?: string;
  type?: string;
  className?: string;
  disabled?: boolean;
}

export function InputForm({
  form,
  fields,
  placeholder,
  type = "text",
  className,
  disabled,
}: InputFormProps) {
  const renderInputField = (field: any) => {
    switch (type) {
      case "date":
        return (
          <>
            <PopoverTrigger asChild>
              <Button
                disabled={disabled}
                data-id={`button-calendar-${fields}`}
                variant="outline"
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value ? (
                  format(field.value, "PPP", { locale: id })
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0"
              align="start"
              data-id="date-picker-content"
            >
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date: Date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </>
        );

      default:
        return (
          <Input
            disabled={disabled}
            className="w-full h-9"
            type={type}
            placeholder={placeholder}
            {...field}
          />
        );
    }
  };

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name={fields}
        render={({ field }) => (
          <FormItem className={className}>
            <Popover>
              <FormLabel>{placeholder}</FormLabel>
              <FormControl>{renderInputField(field)}</FormControl>
              <FormMessage />
            </Popover>
          </FormItem>
        )}
      />
    </Form>
  );
}
