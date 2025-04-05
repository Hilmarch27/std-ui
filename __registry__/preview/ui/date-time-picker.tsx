import { DateTimePicker } from '@/registry/ui/date-time-picker'
import React from 'react'

function PreviewDateTimePicker() {
  const [selectedDateTime, setSelectedDateTime] = React.useState<Date>(new Date())

  return (
    <DateTimePicker locale="id" label="Event Date and Time" value={selectedDateTime} onChange={setSelectedDateTime} />
  )
}

export default PreviewDateTimePicker
