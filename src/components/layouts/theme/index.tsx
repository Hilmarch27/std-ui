"use client";

import React from "react";
import { ModalProvider } from "@/registry/hooks/use-modal";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";
import { Modals } from "@/registry/ui/modals";
import dynamic from "next/dynamic";
const ThemeProvider = dynamic(() => import("./provider"), {
  ssr: false,
});
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
    <NuqsAdapter>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
        <Toaster richColors position="bottom-right" />
        <Modals />
      </ThemeProvider>
    </NuqsAdapter>
    </ModalProvider>
  );
}
