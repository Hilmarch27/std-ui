"use client";

import React from "react";
import dynamic from "next/dynamic";
const ThemeProvider = dynamic(() => import("./provider"), {
  ssr: false,
});
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </ThemeProvider>
    </>
  );
}
