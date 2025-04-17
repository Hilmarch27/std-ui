import * as React from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/registry/ui/input'
import { Label } from '@/components/ui/label'

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const FloatingInput: React.FC<FloatingInputProps> = ({ label, id, className, ...props }) => {
  const inputId = id || React.useId()

  return (
    <div className="relative">
      <Input id={inputId} placeholder="" className={cn('dark:bg-background peer', className)} {...props} />
      <Label
        htmlFor={inputId}
        className={cn(
          'rounded-t-[2px] absolute start-2 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-background px-2 text-sm text-primary duration-300',
          'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100',
          'peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2',
          'dark:bg-background rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 cursor-text'
        )}
      >
        {label}
      </Label>
    </div>
  )
}

export { FloatingInput }
