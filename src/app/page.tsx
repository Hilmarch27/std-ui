import { LandingPage } from "@/features/home";
import { absoluteUrl } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: absoluteUrl('/')
  }
}

export default function Home() {
  return <LandingPage />
}
