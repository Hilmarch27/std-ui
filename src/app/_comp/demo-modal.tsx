'use client'
import { Button } from '@/components/ui/button'
import { useModal } from '@/registry/hooks/use-modal'

const ModalDemo = () => {
  const { openModal } = useModal()

  const handleClick = () => {
    openModal({ title: 'Modal title', content: <p>Modal content</p> })
  }

  return (
    <>
      <Button onClick={handleClick}>Open</Button>
    </>
  )
}

export default ModalDemo
