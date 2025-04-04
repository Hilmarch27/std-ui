import { clsx, type ClassValue } from "clsx"
import { ReactNode, ReactElement, isValidElement } from 'react'
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ReactElementWithChildren {
  props: {
    children?: ReactNode
  }
}

export const getPlainTextFromReactNode = (node: ReactNode): string => {
  // Handle primitive types (string and number)
  if (typeof node === 'string' || typeof node === 'number') {
    return node.toString()
  }

  // Handle arrays of nodes
  if (Array.isArray(node)) {
    return node.map(getPlainTextFromReactNode).join('')
  }

  // Handle React elements
  if (isValidElement(node)) {
    // Type assertion with our custom interface that guarantees children property
    const element = node as ReactElement & ReactElementWithChildren
    return getPlainTextFromReactNode(element.props.children || '')
  }

  // Handle null, undefined, or boolean values
  return ''
}
