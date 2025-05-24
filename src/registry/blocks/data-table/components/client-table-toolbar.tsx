'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Column, Table } from '@tanstack/react-table'
import { X } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { DataTableViewOptions } from './data-table-view-options'
import { Input } from '@/registry/ui/input'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { ClientTableDateFilter } from './client-table-date-filter'

interface ClientTableToolbarProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>
}

export function ClientTableToolbar<TData>({ table, children, className, ...props }: ClientTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const meta = table.options.meta
  const selectedRows = table.getSelectedRowModel().rows

  const columns = useMemo(() => table.getAllColumns().filter((column) => column.getCanFilter()), [table])

  const onReset = useCallback(() => {
    table.resetColumnFilters()
  }, [table])

  const removeRows = () => {
    if (meta?.removeSelectedRows) {
      const rowIds = table.getSelectedRowModel().rows.map((row) => row.id)
      meta?.removeSelectedRows(rowIds)
      table.resetRowSelection()
    }
  }
  return (
    <div className={cn('flex w-full items-center justify-between gap-2 overflow-auto p-1', className)} {...props}>
      <div className="flex flex-1 items-center space-x-2">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {columns.map((column) => (
            <ClientTableToolbarFilter key={column.id} column={column} />
          ))}
          {isFiltered && (
            <Button aria-label="Reset filters" variant="outline" size="sm" className="border-dashed" onClick={onReset}>
              <X />
              Reset
            </Button>
          )}
        </div>
        {selectedRows.length > 0 && (
          <Button variant="destructive" size={'sm'} onClick={removeRows}>
            {`Delete ${selectedRows.length} Selected`}
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {children}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}

interface ClientTableToolbarFilterProps<TData> {
  column: Column<TData>
}

function ClientTableToolbarFilter<TData>({ column }: ClientTableToolbarFilterProps<TData>) {
  {
    const columnMeta = column.columnDef.meta
    const onFilterRender = useCallback(() => {
      if (!columnMeta?.variant) return null

      switch (columnMeta.variant) {
        case 'text':
          return (
            <Input
              placeholder={columnMeta.placeholder ?? columnMeta.label}
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(event) => column.setFilterValue(event.target.value)}
              className="h-8 w-40 lg:w-56"
            />
          )

        case 'date':
        case 'dateRange':
          return (
            <ClientTableDateFilter
              column={column}
              title={columnMeta.label ?? column.id}
              multiple={columnMeta.variant === 'dateRange'}
            />
          )

        case 'select':
        case 'multiSelect':
          return (
            <DataTableFacetedFilter
              column={column}
              title={columnMeta.label ?? column.id}
              options={columnMeta.options ?? []}
              multiple={columnMeta.variant === 'multiSelect'}
            />
          )

        default:
          return null
      }
    }, [column, columnMeta])

    return onFilterRender()
  }
}
