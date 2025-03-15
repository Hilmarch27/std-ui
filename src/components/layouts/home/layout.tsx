import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { CommandMenu } from "@/components/utils/command-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Navbar } from "./nav";
import { InstagramLogoIcon } from "@radix-ui/react-icons";

export default function LayoutHome() {
  return (
    <>
      <header className="fixed top-0 z-50 h-14 w-full border-border/40 bg-background/20 backdrop-blur-xl">
        <div className="px-7 flex h-14 max-w-screen-2xl items-center mx-auto">
          <Navbar />
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <CommandMenu />
            </div>
            <nav className="flex items-center">
              <Link
                href={"https://github.com/Hilmarch27/std-ui"}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    }),
                    "h-8 w-8 px-0"
                  )}
                >
                  <Icons.gitHub className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>
              <Link
                href={"https://instagram.com/hilmarch03"}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    }),
                    "h-8 w-8 px-0"
                  )}
                >
                  <InstagramLogoIcon className="h-3 w-3 fill-current" />
                  <span className="sr-only">Instagram</span>
                </div>
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
