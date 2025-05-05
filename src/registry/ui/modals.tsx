import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer'
import { useModal } from '@/registry/hooks/use-modal'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import React from 'react'
import { useMediaQuery } from '@/registry/hooks/use-media-query'
import { Button } from '@/components/ui/button'

export function Modals() {
  const { isOpen, title, content, closeModal } = useModal()

  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (!title || !content) {
    return null
  }

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="flex flex-col gap-0 p-0 min-w-sm sm:max-h-[min(640px,80vh)] w-auto sm:max-w-lg md:max-w-5xl [&>button:last-child]:top-3.5">
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="capitalize border-b border-border px-6 py-4 text-base">{title}</DialogTitle>
            <VisuallyHidden>
              <DialogDescription>@Hilmarch</DialogDescription>
            </VisuallyHidden>
            <div className="overflow-y-auto">
              <div className="p-6 text-base">{content}</div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={isOpen} onOpenChange={closeModal}>
      <DrawerContent className="max-h-[min(640px,80vh)]">
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <VisuallyHidden>
            <DrawerDescription>@Hilmarch</DrawerDescription>
          </VisuallyHidden>
        </DrawerHeader>
        <div className="overflow-y-auto">
          <div className="text-base px-4">{content}</div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button size={'sm'} variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
