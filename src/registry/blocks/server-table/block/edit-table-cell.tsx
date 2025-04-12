import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Column, Row, Table } from '@tanstack/react-table'
import { useState, useEffect, ChangeEvent } from 'react'
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
              <SelectTrigger
                title={validationMessage}
                disabled={isDisabled}
                className={cn('w-full', validationMessage && 'border-destructive')}
              >
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

      default:
        return (
          <div className="w-full">
            <Input
              className={cn('h-9', validationMessage && 'border-destructive')}
              value={value}
              title={validationMessage}
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
