import { Geist, Geist_Mono } from 'next/font/google'
import { type Metadata } from 'next'
import { TRPCReactProvider } from '@/trpc/react'
import '@/app/styles/globals.css'
import Providers from '@/components/layouts/theme'
import LayoutHome from '@/components/layouts/home/layout'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Std-UI @Hilmarch03',
  description: 'Std-UI is A collection of UI components Built on top of Shadcn UI'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <TRPCReactProvider>
            <div className="relative flex min-h-screen flex-col">
              <LayoutHome />
              {children}
            </div>
          </TRPCReactProvider>
        </Providers>
      </body>
    </html>
  )
}
