"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  useFieldContext,
  useFormContext,
} from "@/registry/form/hooks/use-form";
import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type FormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> & {
  onSubmit?: () => Promise<void>;
  children: React.ReactNode;
  className?: string;
};

function Form({ onSubmit, children, className, ...props }: FormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await onSubmit?.();
  };

  return (
    <form
      className={cn("space-y-4", className)}
      onSubmit={(e: FormEvent<HTMLFormElement>) => void handleSubmit(e)}
      {...props}
    >
      {children}
    </form>
  );
}

type SubscribeButtonProps = React.ComponentProps<"button"> & {
  label: string;
};

function SubscribeButton({ label, className, ...props }: SubscribeButtonProps) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          className={cn("w-full", className)}
          {...props}
          disabled={isSubmitting}
        >
          {label}
        </Button>
      )}
    </form.Subscribe>
  );
}

type TextFieldProps = React.ComponentProps<"input"> & {
  label: string;
};

function TextField({
  className,
  placeholder,
  label,
  ...props
}: TextFieldProps) {
  const field = useFieldContext<string>();
  return (
    <div className={cn("grid w-full max-w-sm items-center gap-1.5", className)}>
      <Label htmlFor={label}>{label}</Label>
      <Input
        {...props}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        type="text"
        id={label}
        placeholder={placeholder}
      />
    </div>
  );
}

type ComboboxFieldProps = React.ComponentProps<"button"> & {
  label: string;
  options: { label: string; value: string }[];
};

function ComboboxField({
  options,
  className,
  label,
  ...props
}: ComboboxFieldProps) {
  const field = useFieldContext<string>();
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          {...props}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {field.state.value
            ? options.find((opt) => opt.value === field.state.value)?.label
            : `Select ${label.toLowerCase()}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto max-w-3xs p-0">
        <Command>
          <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>Not found.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.value}
                  onSelect={(currentValue) => {
                    field.setValue(
                      currentValue === field.state.value ? "" : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      field.state.value === opt.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {opt.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { Form, SubscribeButton, TextField, ComboboxField };
