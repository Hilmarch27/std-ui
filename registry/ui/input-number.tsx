"use client";

import type React from "react";
import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface InputNumberProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  onChange?: (value: string) => void;
  value?: string;
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  ({ className, onChange, value = "", ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value.replace(/[^\d]/g, "");
      onChange?.(newValue);
    };

    return (
      <Input
        {...props}
        ref={ref}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        className={cn("font-mono", className)}
        value={value}
        onChange={handleChange}
      />
    );
  }
);
InputNumber.displayName = "InputNumber";

export { InputNumber };
