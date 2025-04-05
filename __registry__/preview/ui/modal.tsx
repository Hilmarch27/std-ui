import React from 'react'
import { Button } from '@/components/ui/button'
import { useModal } from '@/registry/hooks/use-modal'

function PreviewModal() {
  const { openModal } = useModal()

  const handleClick = () => {
    openModal('Modal title', <p>Modal content</p>)
  }

  return (
    <>
      <Button onClick={handleClick}>Open</Button>
    </>
  )
}

export default PreviewModal
