"use client";

import { ModalProvider } from "@/registry/hooks/use-modal";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";
import { Modals } from "@/registry/ui/modals";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <NuqsAdapter>
        {children}
        <Toaster richColors position="bottom-right" />
        <Modals />
      </NuqsAdapter>
    </ModalProvider>
  );
}
