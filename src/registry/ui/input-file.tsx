'use client'

import { useState, useRef, type ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Eye, SendIcon, Trash2, Upload } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useModal } from '../hooks/use-modal'

interface InputFileProps {
  id: string
  name: string
  className?: string
  accept?: string
  multiple?: boolean
  onChange?: (files: File[] | null) => void
}

export function InputFile({ id, name, className, accept, multiple = false, onChange, ...props }: InputFileProps) {
  const [files, setFiles] = useState<File[] | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { openModal, closeModal } = useModal()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : null
    setFiles(selectedFiles)

    if (preview) {
      URL.revokeObjectURL(preview)
      setPreview(null)
    }

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
    closeModal()

    if (onChange) {
      onChange(null)
    }
  }

  const togglePreview = () => {
    openModal({ title: 'Preview', content: previewFile() })
  }

  const truncateFileName = (fileName: string, maxLength: number) => {
    if (fileName.length > maxLength) {
      const extensionIndex = fileName.lastIndexOf('.')
      const extension = fileName.substring(extensionIndex)
      return `${fileName.substring(0, maxLength)}...${extension}`
    }
    return fileName
  }

  function previewFile() {
    return (
      <div className="p-1.5 rounded-md bg-muted/20 grid gap-1.5">
        <img src={preview || '/placeholder.svg'} alt="File preview" className="max-w-full object-contain mx-auto" />
        {files && files.length > 0 && (
          <div className="text-xs text-muted-foreground">
            {files.map((file, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="truncate">{truncateFileName(file.name, 30)}</span>
                <span>({(file.size / 1024).toFixed(2)} KB)</span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
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
            } flex items-center gap-2 p-2 border bg-background text-sm`}
          >
            <Upload className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground truncate">
              {files && files.length > 0
                ? multiple
                  ? `${files.length} files selected`
                  : truncateFileName(files[0]?.name || '', 20) // Adjust `20` as needed
                : 'Choose file...'}
            </span>
          </div>
        </div>

        {files && files.length > 0 && (
          <div className="border border-l-0 rounded-r-md flex">
            <Button
              className="border-none rounded-none"
              type="button"
              variant="outline"
              size="icon"
              onClick={togglePreview}
              disabled={!preview}
              d-title="view file"
            >
              <Eye size={16} />
              <span className="sr-only">View file</span>
            </Button>
            <Button
              className="border-none rounded-none"
              type="button"
              variant="outline"
              size="icon"
              onClick={handleDelete}
              d-title="remove file"
            >
              <Trash2 size={16} />
              <span className="sr-only">Delete file</span>
            </Button>
            <Button
              className="border-none rounded-l-none rounded-r-md"
              type="button"
              variant="outline"
              size="icon"
              d-title="save file"
            >
              <SendIcon size={16} />
              <span className="sr-only">Save file</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
