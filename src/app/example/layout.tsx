import React from 'react'

export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="flex h-svh mx-auto justify-content-center items-center">{children}</div>
}
