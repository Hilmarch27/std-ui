import React from 'react'
import { Button } from '@/components/ui/button'
import { useModal } from '@/registry/hooks/use-modal'

function PreviewModal() {
  const { openModal } = useModal()

  const handleClick = () => {
    openModal({ title: 'Modal title', content: <>Modal Content</> })
  }

  return (
    <>
      <Button onClick={handleClick}>Open</Button>
    </>
  )
}

export default PreviewModal
