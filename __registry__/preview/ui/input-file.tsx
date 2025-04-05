import { InputFile } from '@/registry/ui/input-file'
import React from 'react'

function PreviewInputFile() {
  const [files, setFiles] = React.useState<File[] | null>(null)
  console.log('selected file:', files)

  const handleFileChange = (selectedFiles: File[] | null) => {
    setFiles(selectedFiles)
  }
  return <InputFile id="file-upload" name="file" accept="image/*" onChange={handleFileChange} />
}

export default PreviewInputFile
