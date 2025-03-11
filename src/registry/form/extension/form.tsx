"use client";

import type React from "react";
import { cn } from "@/lib/utils";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: () => Promise<void>;
  children: React.ReactNode;
  className?: string;
}

export function Form({ onSubmit, children, className, ...props }: FormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await onSubmit?.();
  };

  return (
    <form
      className={cn("space-y-4", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      {children}
    </form>
  );
}
