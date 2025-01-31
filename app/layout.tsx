import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import "./styles/prosemirror.css";
import LayoutHome from "@/components/layouts/home/layout";
import Providers from "@/components/layouts/theme";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Std-UI",
  description: "Std-UI is A collection of UI components Built on top of Shadcn UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Toaster richColors position="bottom-right"/>
          <div className="relative flex min-h-screen flex-col">
            <LayoutHome />
            <div>{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
