import { Geist, Geist_Mono } from 'next/font/google'
import { type Metadata } from 'next'
import { TRPCReactProvider } from '@/trpc/react'
import '@/styles/globals.css'
import Providers from '@/components/layouts/theme'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Std-UI Customized Shadcn UI Blocks & Components | Preview & Copy',
  description: 'Std-UI is A collection of UI components Built on top of Shadcn UI',
  keywords: [
    'Shadcn UI blocks',
    'Shadcn UI components',
    'Shadcn UI previews',
    'UI blocks for developers',
    'Shadcn UI code snippets',
    'Shadcn UI examples',
    'Shadcn UI customization',
    'Free Shadcn UI blocks',
    'Preview Shadcn UI components',
    'Shadcn UI examples for websites',
    'Copy Shadcn UI code snippets',
    'UI design components',
    'UI design blocks',
    'Customized Shadcn UI blocks',
    'Custom Shadcn UI components',
    'STD UI',
    'Std ui components'
  ],
  openGraph: {
    title: 'Std-UI Customized Shadcn UI Blocks & Components | Preview & Copy',
    description: 'Std-UI is A collection of UI components Built on top of Shadcn UI',
    type: 'website'
  },
  icons: {
    icon: { url: '/squirrel.svg' }
  }
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <TRPCReactProvider>
            <div className="relative flex min-h-screen flex-col">{children}</div>
          </TRPCReactProvider>
        </Providers>
      </body>
    </html>
  )
}
