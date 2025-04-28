'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Download, LucideIcon } from 'lucide-react'
import React from 'react'

type ButtonInputFileProps = Omit<React.ComponentProps<'button'>, 'onChange'> & {
  onChange: (file: File | null) => void
  maxSize?: number
  accept?: string
  icon?: LucideIcon
}

function ButtonInputFile({
  onChange,
  accept = '.csv',
  className,
  maxSize = 2 * 1024 * 1024, //2MB
  icon: Icon = Download,
  ...props
}: ButtonInputFileProps) {
  const [fileName, setFileName] = React.useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    if (file) {
      if (file.size > maxSize) {
        alert('File is too large. Max size is 2MB.')
        e.target.value = '' // Clear file input
        onChange(null)
        return
      }
      setFileName(file.name)
      onChange(file)
    } else {
      setFileName(null)
      onChange(null)
    }
  }

  return (
    <Button
      {...props}
      className={cn('bg-accent dark:bg-accent', fileName && 'border-primary dark:border-primary', className)}
      variant={'outline'}
      size={'sm'}
      type="button"
      title={fileName ? fileName : 'Input File'}
      onClick={handleClick}
    >
      <Icon className={fileName ? 'stroke-primary' : undefined} />
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="sr-only"
        aria-hidden="true"
      />
    </Button>
  )
}

export { ButtonInputFile }
