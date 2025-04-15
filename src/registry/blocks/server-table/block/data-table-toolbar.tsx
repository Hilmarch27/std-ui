'use client'

import { Table } from '@tanstack/react-table'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DataTableViewOptions } from './data-table-view-options'
import { DataTableFacetedFilter } from '@/registry/blocks/server-table/block/data-table-faceted-filter'
import { cn } from '@/lib/utils'
import { DebouncedInput } from '@/registry/ui/debounce-input'

interface DataTableToolbarProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>
  facetedFilters?: {
    column: string
    title: string
    options: {
      label: string
      value: string
      icon?: React.ComponentType<{ className?: string }>
    }[]
  }[]
}
export function DataTableToolbar<TData>({
  table,
  facetedFilters,
  children,
  className,
  ...props
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const meta = table.options.meta
  const selectedRows = table.getSelectedRowModel().rows

  const removeRows = () => {
    meta?.removeSelectedRows!(table.getSelectedRowModel().rows.map((row) => row.index))
    table.resetRowSelection()
  }
  const global = table.getState().globalFilter

  return (
    <div className={cn('flex w-full items-center justify-between gap-2 overflow-auto p-1', className)} {...props}>
      <div className="flex flex-1 items-center space-x-2">
        <DebouncedInput
          className="-ms-1 h-8 w-[150px] lg:w-[250px]"
          value={global}
          placeholder="Search..."
          onChange={(value) => table.setGlobalFilter(String(value).trim())}
        />
        {facetedFilters?.map((filter) => (
          <DataTableFacetedFilter
            key={filter.column}
            column={table.getColumn(filter.column)}
            title={filter.title}
            options={filter.options}
          />
        ))}
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <X />
          </Button>
        )}
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
