import * as React from 'react'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  )
}

type InputFloatingProps = React.ComponentProps<'input'> & {
  label: string
}

function InputFloating({ label, className, ...props }: InputFloatingProps) {
  return (
    <div className="relative">
      <Input id={label} placeholder="" className={cn('dark:bg-background peer', className)} {...props} />
      <Label
        htmlFor={label}
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

function InputNumber({ className,  ...props }: React.ComponentProps<'input'>) {
  const [inputValue, setInputValue] = React.useState<string>('')

  // Initialize with default or provided value
  React.useEffect(() => {
    if (props.value !== undefined) {
      const initialValue =
        typeof props.value === 'number'
          ? String(props.value)
          : typeof props.value === 'string'
          ? props.value.replace(/\D/g, '')
          : ''
      setInputValue(initialValue)
    }
  }, [props.value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the input value
    setInputValue(e.target.value.replace(/\D/g, ''))
    // Call the onChange callback with the event object
    if (props.onChange) {
      props.onChange(e)
    }
  }

  return (
    <Input
      {...props}
      type="text"
      inputMode="numeric"
      value={inputValue}
      onChange={handleInputChange}
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
    />
  )
}

export { Input, InputFloating, InputNumber }
