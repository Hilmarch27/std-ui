'use client'

import { useState, useRef, type ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Eye, SendIcon, Trash2, Upload } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CustomFileInputProps {
  id: string
  name: string
  className?: string
  accept?: string
  multiple?: boolean
  onChange?: (files: File[] | null) => void
}

export function CustomFileInput({
  id,
  name,
  className,
  accept,
  multiple = false,
  onChange,
  ...props
}: CustomFileInputProps) {
  const [files, setFiles] = useState<File[] | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : null
    setFiles(selectedFiles)

    // Clear previous preview
    if (preview) {
      URL.revokeObjectURL(preview)
      setPreview(null)
    }

    // Generate preview for the first file if it's an image
    if (selectedFiles && selectedFiles.length > 0 && selectedFiles[0]?.type.startsWith('image/')) {
      const url = URL.createObjectURL(selectedFiles[0])
      setPreview(url)
    }

    if (onChange) {
      onChange(selectedFiles)
    }
  }

  const handleDelete = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }

    if (preview) {
      URL.revokeObjectURL(preview)
    }

    setFiles(null)
    setPreview(null)
    setShowPreview(false)

    if (onChange) {
      onChange(null)
    }
  }

  const togglePreview = () => {
    setShowPreview((prev) => !prev)
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center">
        <div className="relative flex-1">
          <input
            id={id}
            ref={inputRef}
            type="file"
            name={name}
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
            {...props}
          />
          <div
            className={`${
              files ? 'rounded-l-md' : 'rounded-md'
            } flex items-center gap-2 p-2 border  bg-background text-sm`}
          >
            <Upload className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground truncate">
              {files && files.length > 0
                ? multiple
                  ? `${files.length} files selected`
                  : files[0]?.name
                : 'Choose file...'}
            </span>
          </div>
        </div>

        {files && files.length > 0 && (
          <div className="border border-l-0">
            <Button
              className="border-none rounded-none"
              type="button"
              variant="outline"
              size="icon"
              onClick={togglePreview}
              disabled={!preview}
              d-title="View file"
            >
              <Eye className="h-4 w-4" />
              <span className="sr-only">View file</span>
            </Button>
            <Button
              className="border-none rounded-none"
              type="button"
              variant="outline"
              size="icon"
              onClick={handleDelete}
              d-title="Delete file"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete file</span>
            </Button>
            <Button
              className="border-none rounded-none"
              type="button"
              variant="outline"
              size="icon"
              onClick={handleDelete}
              d-title="Simple Tooltip"
            >
              <SendIcon className="h-4 w-4" />
              <span className="sr-only">Save file</span>
            </Button>
          </div>
        )}
      </div>

      {showPreview && preview && (
        <div className="mt-2 border rounded-md p-2 bg-muted/20">
          <img
            src={preview || '/placeholder.svg'}
            alt="File preview"
            className="max-h-48 max-w-full object-contain mx-auto"
          />
        </div>
      )}

      {files && files.length > 0 && (
        <div className="text-xs text-muted-foreground">
          {files.map((file, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="truncate">{file.name}</span>
              <span>({(file.size / 1024).toFixed(2)} KB)</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
