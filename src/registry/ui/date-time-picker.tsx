'use client'

import type React from 'react'

import { useState, useId } from 'react'
import { format, set } from 'date-fns'
import { CalendarIcon, ClockIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type { DropdownNavProps, DropdownProps } from 'react-day-picker'
import { id as indonesianLocale } from 'date-fns/locale'

type DateTimePickerProps = {
  label?: string
  value?: Date
  onChange?: (date: Date) => void
  locale?: 'en' | 'id'
  dateTimeFormat?: string
}

export function DateTimePicker({
  label = 'Date and Time',
  value,
  onChange,
  locale = 'en',
  dateTimeFormat
}: DateTimePickerProps) {
  const id = useId()
  const [dateTime, setDateTime] = useState<Date | undefined>(value || new Date())

  // Format time as HH:MM:SS for the time input
  const timeString = dateTime ? format(dateTime, 'HH:mm:ss') : '12:00:00'

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return

    // Preserve the time from the current dateTime
    if (dateTime) {
      const newDateTime = set(date, {
        hours: dateTime.getHours(),
        minutes: dateTime.getMinutes(),
        seconds: dateTime.getSeconds()
      })
      setDateTime(newDateTime)
      onChange?.(newDateTime)
    } else {
      setDateTime(date)
      onChange?.(date)
    }
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = e.target.value
    if (!timeValue || !dateTime) return

    // Parse the time string and update the dateTime with the new time values
    const [hours, minutes, seconds] = timeValue.split(':').map(Number)
    const newDateTime = set(dateTime, { hours, minutes, seconds: seconds || 0 })

    setDateTime(newDateTime)
    onChange?.(newDateTime)
  }

  const handleCalendarChange = (_value: string | number, _e: React.ChangeEventHandler<HTMLSelectElement>) => {
    const _event = {
      target: {
        value: String(_value)
      }
    } as React.ChangeEvent<HTMLSelectElement>
    _e(_event)
  }

  const getLocale = () => {
    switch (locale) {
      case 'id':
        return indonesianLocale
      default:
        return undefined // Default English locale
    }
  }

  const getDefaultFormat = () => {
    switch (locale) {
      case 'id':
        return 'dd MMMM yyyy, HH:mm:ss'
      default:
        return 'PPP p' // Default English format
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={cn('grid w-full items-center gap-1.5')}>
          <Label htmlFor={id}>{label}</Label>
          <Button
            id={id}
            variant="outline"
            className={cn(
              'w-full min-w-[240px] justify-start text-left font-normal',
              !dateTime && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateTime ? (
              format(dateTime, dateTimeFormat || getDefaultFormat(), { locale: getLocale() })
            ) : (
              <span>Pick a date and time</span>
            )}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent side="top" className="p-0 w-auto" align="start">
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={dateTime}
            onSelect={handleDateChange}
            className="p-2"
            classNames={{
              month_caption: 'mx-0'
            }}
            captionLayout="dropdown"
            defaultMonth={dateTime || new Date()}
            startMonth={new Date(1980, 6)}
            hideNavigation
            components={{
              DropdownNav: (props: DropdownNavProps) => {
                return <div className="flex w-full gap-2 items-center">{props.children}</div>
              },
              Dropdown: (props: DropdownProps) => {
                return (
                  <Select
                    value={String(props.value)}
                    onValueChange={(value) => {
                      if (props.onChange) {
                        handleCalendarChange(value, props.onChange)
                      }
                    }}
                  >
                    <SelectTrigger className="h-8 w-fit first:grow font-medium">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[min(26rem,var(--radix-select-content-available-height))]">
                      {props.options?.map((option) => (
                        <SelectItem key={option.value} value={String(option.value)} disabled={option.disabled}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )
              }
            }}
          />
          <div className="border-t p-3">
            <div className="flex items-center gap-3">
              <Label htmlFor={`${id}-time`} className="text-xs">
                Enter time
              </Label>
              <div className="relative grow">
                <Input
                  id={`${id}-time`}
                  type="time"
                  onChange={handleTimeChange}
                  step="1"
                  value={timeString}
                  className="peer appearance-none ps-9 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                  <ClockIcon size={16} aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
