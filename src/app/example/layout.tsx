'use client'
import { ExamplesNav } from '@/components/examples-nav'
import DocTopBar from '@/components/layouts/doc-top-bar'
import { DescriptionText, MainHeading } from '@/components/utils/typography'
import React from 'react'

export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <DocTopBar />
      <div className="max-w-screen-2xl w-full mx-auto pt-16 pb-8 px-4">
        <MainHeading>Build your component library</MainHeading>
        <DescriptionText className="mt-1">
          A set of beautifully-designed, accessible components and a code distribution platform. Works with your
          favorite frameworks. Open Source. Open Code.
        </DescriptionText>
        <div className="border-grid border-b border-t mt-5">
          <div className="container-wrapper">
            <div className="container py-4">
              <ExamplesNav className="[&>a:first-child]:text-primary" />
            </div>
          </div>
        </div>
        <div className="mt-7">{children}</div>
      </div>
    </main>
  )
}
