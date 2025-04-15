import { DocsSidebarNav } from '@/components/layouts/DocsSidebarNav'
import DocTopBar from '@/components/layouts/doc-top-bar'
import { docsConfig } from '@/lib/configs/docs-config'
import { constructMetadata } from '@/lib/configs/metadata'
import { Metadata } from 'next'

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
  ]
})

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <>
      <DocTopBar />
      <div className="border-b max-w-screen-2xl mx-auto pt-16 w-full">
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block border-r-2">
            <div className="h-full pr-6 py-6 lg:py-8 overflow-y-auto">
              <DocsSidebarNav config={docsConfig} />
            </div>
          </aside>
          {children}
        </div>
      </div>
    </>
  )
}
