"use client";

import type React from "react";
import { forwardRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface InputPhoneProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  onChange?: (value: string) => void;
  value?: string;
  countryCode?: string;
}

const InputPhone = forwardRef<HTMLInputElement, InputPhoneProps>(
  ({ className, onChange, value = "", countryCode = "62", ...props }, ref) => {
    const [rawValue, setRawValue] = useState(value.replace(/\D/g, ""));

    const formatPhoneNumber = (input: string) => {
      if (!input) return "";

      const cleaned = input.replace(/\D/g, "");
      let formatted = cleaned.replace(/^0+/, "");

      if (formatted.length > 0) {
        if (!formatted.startsWith(countryCode)) {
          formatted = countryCode + formatted;
        }

        formatted =
          `+${countryCode} ` +
          formatted
            .slice(countryCode.length)
            .replace(/(\d{3})(\d{4})(\d{4})/, "$1 $2 $3");
      }

      return formatted.trim();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value
        .replace(/\D/g, "")
        .replace(/^0+/, "");

      setRawValue(inputValue);
      onChange?.(inputValue);
    };

    return (
      <Input
        {...props}
        ref={ref}
        type="tel"
        className={cn("font-mono", className)}
        value={formatPhoneNumber(rawValue)}
        onChange={handleChange}
        placeholder={`+${countryCode} 812 3456 7890`}
      />
    );
  }
);
InputPhone.displayName = "InputPhone";

export { InputPhone };

const Preview = () => {
  const [phone, setPhone] = useState("");
  return (
    <div className="flex flex-row space-x-3 items-center">
      <InputPhone
        placeholder="Phone"
        className="mt-2"
        value={phone}
        onChange={(value) => setPhone(value)}
      />

      <Button
        variant={"outline"}
        className="mt-2"
        onClick={() => alert(phone)}
      >
        Submit
      </Button>
    </div>
  );
};

export default Preview;