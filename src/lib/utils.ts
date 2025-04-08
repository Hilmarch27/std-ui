import { env } from '@/env.mjs'
import { clsx, type ClassValue } from 'clsx'
import { ReactNode, ReactElement, isValidElement } from 'react'
import { twMerge } from 'tailwind-merge'

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

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type GroupBy<T, K extends keyof T> = Record<string, T[]>

export function groupBy<T, K extends keyof T>(array: T[], key: K): GroupBy<T, K> {
  return array.reduce((acc, item) => {
    const keyValue = String(item[key])
    if (!acc[keyValue]) {
      acc[keyValue] = []
    }
    acc[keyValue].push(item)
    return acc
  }, {} as GroupBy<T, K>)
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_CLIENT_URL}${path}`
}
