"use client";

import { ModalProvider } from "@/registry/hooks/use-modal";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";
import { Modal } from "@/registry/ui/modal";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <NuqsAdapter>
        {children}
        <Toaster richColors position="bottom-right" />
        <Modal />
      </NuqsAdapter>
    </ModalProvider>
  );
}
