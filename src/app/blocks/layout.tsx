import { constructMetadata } from "@/lib/configs/metadata"
import { absoluteUrl } from "@/lib/utils"
import { Metadata } from "next"

export const metadata: Metadata = constructMetadata({
  title: 'Beautifully Designed Shadcn UI Templates',
  description:
    'Discover a collection of premium Shadcn UI templates designed to make your project shine. With modern designs and smooth functionality, these templates help you build stunning UIs with ease!',
  keywords: [
    'Shadcn UI',
    'Shadcn UI templates',
    'Tailwind CSS templates',
    'Beautiful Shadcn UI templates',
    'Beautifully designed Shadcn UI templates',
    'Beautiful Tailwind CSS templates',
    'Premium Shadcn UI templates',
    'Premium Tailwind CSS templates',
    'Free Shadcn UI templates',
    'Free Tailwind CSS templates',
    'Shadcn UI landing page templates',
    'Landing page templates',
    'Shadcn UI portfolio templates',
    'Custom Shadcn UI components',
    'STD UI',
    'Std ui components'
  ],
  alternates: {
    canonical: absoluteUrl(`/blocks`)
  }
})

interface BlocksLayoutProps {
  children: React.ReactNode
}

export default function BlocksLayout({ children }: BlocksLayoutProps) {
  return <>{children}</>
}
