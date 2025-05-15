'use client'

import type React from 'react'
import { createContext, useState, useContext, type ReactNode, useCallback, useMemo } from 'react'

type ModalContextType = {
  title: string
  isOpen: boolean
  content: ReactNode | null
  openModal: ({ title, content }: { title: string; content: ReactNode }) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState<ReactNode | null>(null)

  const openModal = useCallback(({ title, content }: { title: string; content: ReactNode }) => {
    setTitle(title)
    setContent(content)
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setTitle('')
    setIsOpen(false)
    setContent(null)
  }, [])

  const value = useMemo(
    () => ({ title, isOpen, content, openModal, closeModal }),
    [title, isOpen, content, openModal, closeModal]
  )

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

const useModal = () => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error(
      'useModal must be used within a ModalProvider. ' + 'Please wrap your component with <ModalProvider>'
    )
  }
  return context
}

export { useModal, ModalProvider }
