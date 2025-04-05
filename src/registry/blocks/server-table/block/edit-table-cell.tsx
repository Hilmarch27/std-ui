import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Column, Row, Table } from '@tanstack/react-table'
import { Check, CircleAlert, X } from 'lucide-react'
import { useState, useEffect, ChangeEvent } from 'react'
import { toast } from 'sonner'
import { Option } from '@/registry/blocks/server-table/lib/types'

type EditTableCellProps<TData> = {
  getValue: () => any
  row: Row<TData>
  column: Column<TData>
  table: Table<TData>
}

export function EditTableCell<TData>({ getValue, row, column, table }: EditTableCellProps<TData>) {
  const initialValue = getValue()
  const columnMeta = column.columnDef.meta
  const tableMeta = table.options.meta
  const [value, setValue] = useState(initialValue)
  const [validationMessage, setValidationMessage] = useState('')

  useEffect(() => {
    if (tableMeta?.editedRows![row.id]) {
      validateInput(initialValue)
    }
  }, [tableMeta?.editedRows![row.id]])

  useEffect(() => {
    if (validationMessage) {
      toast.custom((t) => (
        <div className="w-[var(--width)] rounded-lg border border-destructive bg-background px-4 py-3">
          <div className="flex gap-2">
            <div className="flex grow gap-3">
              <CircleAlert className="mt-0.5 shrink-0 text-red-500" size={16} strokeWidth={2} aria-hidden="true" />
              <div className="flex grow justify-between gap-12">
                <p className="text-sm">{validationMessage}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
              onClick={() => toast.dismiss(t)}
              aria-label="Close banner"
            >
              <X
                size={16}
                strokeWidth={2}
                className="opacity-60 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              />
            </Button>
          </div>
        </div>
      ))
    }
  }, [validationMessage])

  useEffect(() => {
    setValue(initialValue)
    if (tableMeta?.editedRows![row.id]) {
      validateInput(initialValue)
    }
  }, [initialValue])

  const validateInput = (inputValue: any) => {
    let message = ''
    if (columnMeta?.required && (!inputValue || !inputValue.trim())) {
      message = columnMeta.validationMessage || 'This field is required'
    } else if (inputValue && inputValue.trim()) {
      if (columnMeta?.pattern) {
        const regex = new RegExp(columnMeta.pattern)
        if (!regex.test(inputValue)) {
          message = columnMeta.validationMessage || 'Invalid format'
        }
      }

      if (columnMeta?.validate) {
        const isValid = columnMeta.validate(inputValue)
        if (!isValid) {
          message = columnMeta.validationMessage || 'Validation failed'
        }
      }
    }

    setValidationMessage(message)
    tableMeta?.updateData!(row.index, column.id, inputValue, message === '')
    return message === ''
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    validateInput(newValue)
  }

  const handleSelectChange = (newValue: string) => {
    setValue(newValue)
    validateInput(newValue)
  }

  const isDisabled = typeof columnMeta?.disabled === 'function' ? columnMeta.disabled(row) : columnMeta?.disabled

  const renderInputField = () => {
    switch (columnMeta?.type) {
      case 'select':
        return (
          <div className="w-full">
            <Select onValueChange={handleSelectChange} defaultValue={initialValue}>
              <SelectTrigger disabled={isDisabled} className={cn('w-full', validationMessage && 'border-destructive')}>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {columnMeta?.options?.map((option: Option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )

      case 'combobox':
        return (
          <ComboboxField
            value={value}
            options={columnMeta.options!}
            onChange={(newValue) => {
              setValue(newValue)
              validateInput(newValue)
            }}
            hasError={validationMessage !== ''}
            placeholder="Select option..."
          />
        )

      default:
        return (
          <div className="w-full">
            <Input
              className={cn('h-9', validationMessage && 'border-destructive')}
              value={value}
              disabled={isDisabled}
              onChange={handleChange}
              type={columnMeta?.type || 'text'}
              required={columnMeta?.required}
              pattern={columnMeta?.pattern}
            />
          </div>
        )
    }
  }

  if (!tableMeta?.editedRows![row.id]) {
    return <span className="w-auto">{value}</span>
  }

  return renderInputField()
}

const ComboboxField = ({
  value,
  options,
  onChange,
  hasError,
  placeholder = 'Select option...'
}: {
  value: string
  options: Option[]
  onChange: (value: string) => void
  hasError?: boolean
  placeholder?: string
}) => {
  // Function untuk mendapatkan label berdasarkan value
  const getLabel = (value: string) => {
    const option = options.find((opt) => opt.value === value)
    return option ? option.label : placeholder
  }

  return (
    <div className="w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn('w-full justify-between', hasError && 'border-destructive')}
          >
            {getLabel(value)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search option..." />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label} // Search by label
                    onSelect={(currentValue) => {
                      // Find the option with the matching label and save its value
                      const selectedOption = options.find((opt) => opt.label === currentValue)
                      onChange(selectedOption ? selectedOption.value : '')
                    }}
                  >
                    {option.label}
                    <Check className={cn('ml-auto h-4 w-4', value === option.value ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
