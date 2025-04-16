'use client'

import type React from 'react'
import { useState, useEffect, type ChangeEvent } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type InputIDRProps = Omit<React.ComponentProps<'input'>, 'onChange'> & {
  onChange?: (value: number) => void
}

export function InputIDR({ onChange, className, value, ...props }: InputIDRProps) {
  // Track both the numeric value and the formatted display value
  const [numericValue, setNumericValue] = useState<number>(0)
  const [displayValue, setDisplayValue] = useState<string>('')

  // Initialize with default or provided value
  useEffect(() => {
    if (value !== undefined) {
      const initialValue = typeof value === 'number' ? value : 0
      setNumericValue(initialValue)
      setDisplayValue(formatRupiah(initialValue))
    }
  }, [value])

  // Format a number as Rupiah
  const formatRupiah = (value: number): string => {
    return `Rp ${value.toLocaleString('id-ID')}`
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Remove all non-digit characters
    const digitsOnly = e.target.value.replace(/\D/g, '')

    // Convert to number
    const newNumericValue = Number.parseInt(digitsOnly) || 0

    // Update the numeric value
    setNumericValue(newNumericValue)

    // Format and update the display value
    const formattedValue = formatRupiah(newNumericValue)
    setDisplayValue(formattedValue)

    // Call the onChange callback with the numeric value
    if (onChange) {
      onChange(newNumericValue)
    }
  }

  // Handle focus to show only the number
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // When focused, show only the number without formatting
    e.target.value = numericValue.toString()
    e.target.select()
  }

  // Handle blur to reformat the value
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // When blurred, reapply the formatting
    const formattedValue = formatRupiah(numericValue)
    e.target.value = formattedValue
  }

  return (
    <Input
      className={cn('w-full', className)}
      {...props}
      type="text"
      inputMode="numeric"
      value={displayValue}
      onChange={handleInputChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  )
}
