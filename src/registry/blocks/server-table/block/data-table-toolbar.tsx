'use client'

import { Column, Table } from '@tanstack/react-table'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DataTableViewOptions } from './data-table-view-options'
import { DataTableFacetedFilter } from '@/registry/blocks/server-table/block/data-table-faceted-filter'
import { cn } from '@/lib/utils'
import React from 'react'
import { DataTableDateFilter } from './data-table-date-filter'
import { Input } from '@/registry/ui/input'

interface DataTableToolbarProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>
}
export function DataTableToolbar<TData>({ table, children, className, ...props }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const meta = table.options.meta
  const selectedRows = table.getSelectedRowModel().rows

  const columns = React.useMemo(() => table.getAllColumns().filter((column) => column.getCanFilter()), [table])

  const onReset = React.useCallback(() => {
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
            <DataTableToolbarFilter key={column.id} column={column} />
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

interface DataTableToolbarFilterProps<TData> {
  column: Column<TData>
}

function DataTableToolbarFilter<TData>({ column }: DataTableToolbarFilterProps<TData>) {
  {
    const columnMeta = column.columnDef.meta
    console.log('ColumnMeta', columnMeta?.options)
    const onFilterRender = React.useCallback(() => {
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
            <DataTableDateFilter
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
