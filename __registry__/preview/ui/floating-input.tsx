import { FloatingInput } from '@/registry/ui/floating-input'
import React from 'react'

function PreviewFloatingInput() {
  const [name, setName] = React.useState<string>('')

  return <FloatingInput value={name} onChange={(e) => setName(e.target.value)} id="name" label="name" />
}

export default PreviewFloatingInput
