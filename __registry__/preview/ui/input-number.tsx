"use client";

import type React from "react";
import { forwardRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

const Preview = () => {
  const [number, setNumber] = useState("");
  return (
    <div className="flex flex-row space-x-3 items-center">
      <InputNumber
        placeholder="Number"
        className="mt-2"
        value={number}
        onChange={(value) => setNumber(value)}
      />

      <Button
        variant={"outline"}
        className="mt-2"
        onClick={() => alert(number)}
      >
        Submit
      </Button>
    </div>
  );
};

export default Preview;