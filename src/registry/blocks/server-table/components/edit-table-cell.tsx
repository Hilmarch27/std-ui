import { Input } from '@/registry/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Column, Row, Table } from '@tanstack/react-table'
import { useState, useEffect, ChangeEvent, createElement } from 'react'
import { ZodError } from 'zod'
import { Option } from '../lib/types/data-table'
import { Badge } from '@/components/ui/badge'

type EditTableCellProps<TData> = {
  getValue: () => any
  row: Row<TData>
  column: Column<TData>
  table: Table<TData>
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
}

export function EditTableCell<TData>({ getValue, row, column, table, icon }: EditTableCellProps<TData>) {
  const initValue = getValue()
  const columnMeta = column.columnDef.meta
  const tableMeta = table.options.meta
  const [value, setValue] = useState(initValue)
  const [valMsg, setvalMsg] = useState('')

  if (!tableMeta || !columnMeta || !tableMeta.editedRows) {
    throw new Error('Table meta or column meta is not defined')
  }

  useEffect(() => {
    if (tableMeta.editedRows && tableMeta.editedRows[row.id]) {
      validateInput(initValue)
    }
  }, [tableMeta.editedRows[row.id]])

  useEffect(() => {
    setValue(initValue)
    if (tableMeta.editedRows && tableMeta.editedRows[row.id]) {
      validateInput(initValue)
    }
  }, [initValue])

  const validateInput = (inputValue: any) => {
    let message = ''
    let isValid = true

    // Zod validation
    if (columnMeta.schema) {
      try {
        columnMeta.schema.parse(inputValue)
      } catch (error) {
        if (error instanceof ZodError) {
          message = error.errors[0]?.message ?? 'Invalid input'
          isValid = false
        }
      }
    }

    setvalMsg(message)
    tableMeta.updateData!(row.index, column.id, inputValue, isValid)
    return isValid
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

  const isDisabled = typeof columnMeta.disabled === 'function' ? columnMeta.disabled(row) : columnMeta.disabled

  const renderInputField = () => {
    switch (columnMeta.variant) {
      case 'multiSelect':
      case 'select':
        return (
          <div className="w-full">
            <Select onValueChange={handleSelectChange} defaultValue={initValue}>
              <SelectTrigger
                data-error={!!valMsg}
                title={valMsg}
                disabled={isDisabled}
                className={cn(
                  'w-full data-[error=true]:text-destructive data-[error=true]:ring-destructive data-[error=true]:border-none'
                )}
              >
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {columnMeta.options!.map((option: Option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {valMsg && <p className="text-[10px] mt-0.5 text-destructive">{valMsg}</p>}
          </div>
        )

      default:
        return (
          <div className="w-full">
            <Input
              className={cn(
                'h-9 data-[error=true]:text-destructive data-[error=true]:ring-destructive data-[error=true]:border-none'
              )}
              value={value}
              data-error={!!valMsg}
              title={valMsg}
              disabled={isDisabled}
              onChange={handleChange}
              type={columnMeta.variant || 'text'}
            />
          </div>
        )
    }
  }

  const renderLabel = () => {
    switch (columnMeta.variant) {
      case 'select':
      case 'multiSelect':
        return (
          <Badge variant="outline" className="py-1 [&>svg]:size-3.5">
            {icon && createElement(icon)}
            <span className="capitalize">{value}</span>
          </Badge>
        )

      default:
        return (
          <span className="w-auto">{value}</span>
        )
    }
  }

  if (!tableMeta.editedRows[row.id]) {
    return renderLabel()
  }

  return renderInputField()
}
