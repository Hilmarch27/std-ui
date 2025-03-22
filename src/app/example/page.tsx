'use client'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon, ClockIcon } from 'lucide-react'
import React, { useId } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { DropdownNavProps, DropdownProps } from 'react-day-picker'
import { Input } from '@/components/ui/input'

function page() {
  const id = useId()
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const handleCalendarChange = (_value: string | number, _e: React.ChangeEventHandler<HTMLSelectElement>) => {
    const _event = {
      target: {
        value: String(_value)
      }
    } as React.ChangeEvent<HTMLSelectElement>
    _e(_event)
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <div className={cn('grid w-full items-center gap-1.5')}>
            <Label htmlFor="date">date</Label>
            <Button
              variant={'outline'}
              className={cn('w-full min-w-[240px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
            >
              <CalendarIcon />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent side="top" className="p-0 w-auto" align="start">
          <div className="rounded-md border">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="p-2"
              classNames={{
                month_caption: 'mx-0'
              }}
              captionLayout="dropdown"
              defaultMonth={new Date()}
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
                <Label htmlFor={id} className="text-xs">
                  Enter time
                </Label>
                <div className="relative grow">
                  <Input
                    id={id}
                    type="time"
                    step="1"
                    defaultValue="12:00:00"
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
    </>
  )
}

export default page
