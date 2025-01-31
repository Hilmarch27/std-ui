"use client";

import type React from "react";
import { forwardRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface InputCurrencyProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  onChange?: (value: string) => void;
  value?: string;
  currency?: string;
  locale?: string;
}

const InputCurrency = forwardRef<HTMLInputElement, InputCurrencyProps>(
  (
    {
      className,
      onChange,
      value = "",
      currency = "IDR",
      locale = "id-ID",
      ...props
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = useState(value);

    const formatCurrency = (value: string) => {
      const number = Number.parseInt(value.replace(/\D/g, ""));
      if (isNaN(number)) return "";

      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(number);
    };

    useEffect(() => {
      setDisplayValue(formatCurrency(value));
    }, [value, currency, locale]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = event.target.value.replace(/\D/g, "");
      setDisplayValue(formatCurrency(rawValue));
      onChange?.(rawValue);
    };

    return (
      <Input
        {...props}
        ref={ref}
        className={cn("font-mono", className)}
        value={displayValue}
        onChange={handleChange}
      />
    );
  }
);

InputCurrency.displayName = "InputCurrency";

export { InputCurrency };
