'use client'
import React from 'react'
import { DateTimePicker } from '@/registry/ui/date-time-picker'
import { FloatingInput } from '@/registry/ui/floating-input'
import { InputFile } from '@/registry/ui/input-file'

function page() {
  const [selectedDateTime, setSelectedDateTime] = React.useState<Date>(new Date())
  const [name, setName] = React.useState<string>('')
  const [files, setFiles] = React.useState<File[] | null>(null)

  const handleFileChange = (selectedFiles: File[] | null) => {
    setFiles(selectedFiles)
  }

  return (
    <div className="grid gap-3.5">
      <DateTimePicker locale="id" label="Event Date and Time" value={selectedDateTime} onChange={setSelectedDateTime} />
      <FloatingInput value={name} onChange={(e) => setName(e.target.value)} id="name" label="name" />
      <InputFile id="file-upload" name="file" accept="image/*" onChange={handleFileChange} />
    </div>
  )
}

export default page
