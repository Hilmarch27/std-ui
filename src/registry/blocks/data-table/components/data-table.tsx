import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { type Table as TanstackTable, Column, flexRender, Header, Row } from '@tanstack/react-table'
import React, { CSSProperties } from 'react'
import { DataTablePagination } from './data-table-pagination'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ArrowLeftToLineIcon, ArrowRightToLineIcon, EllipsisIcon, PinOffIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export interface DataTableProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The table instance returned from useServerTable hook with pagination, sorting, filtering, etc.
   * @type TanstackTable<TData>
   */
  table: TanstackTable<TData>
  /**
   * Callback for handling row clicks.
   * @param row - The row data that was clicked.
   */
  onRowClick?: (row: TData) => void

  /**
   * Function to render a sub-component for expandable rows.
   * @param props - The row properties.
   * @returns A React element.
   */
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactElement

  /**
   * Whether to show pagination controls.
   * @default true
   */
  showPagination?: boolean
}

export function DataTable<TData>({
  table,
  onRowClick,
  renderSubComponent,
  showPagination = true,
  children,
  className,
  ...props
}: DataTableProps<TData>) {
  // Helper function to compute pinning styles for columns
  const getPinningStyles = (column: Column<TData>, header?: Header<TData, unknown>): CSSProperties => {
    const isPinned = column.getIsPinned()
    return {
      left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
      right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
      position: isPinned ? 'sticky' : 'relative',
      width: header?.getSize() !== 150 ? header?.getSize() : undefined,
      zIndex: isPinned ? 1 : 0
    }
  }

  return (
    <div className={cn('w-full space-y-2.5 overflow-auto', className)} {...props}>
      {children}
      <div className="rounded-md border">
        <Table className="[&_td]:border-border [&_th]:border-border table-fixed border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/50">
                {headerGroup.headers.map((header) => {
                  const { column } = header
                  const isPinned = column.getIsPinned()
                  const isLastLeftPinned = isPinned === 'left' && column.getIsLastColumn('left')
                  const isFirstRightPinned = isPinned === 'right' && column.getIsFirstColumn('right')

                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className="[&[data-pinned][data-last-col]]:border-border data-pinned:bg-muted/90 relative h-10 truncate  data-pinned:backdrop-blur-xs [&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0 [&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=right][data-last-col=right]]:border-l"
                      style={{ ...getPinningStyles(column, header) }}
                      data-pinned={isPinned || undefined}
                      data-last-col={isLastLeftPinned ? 'left' : isFirstRightPinned ? 'right' : undefined}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
                        {/* Pin/Unpin column controls with enhanced accessibility */}
                        {!header.isPlaceholder &&
                          header.column.getCanPin() &&
                          (header.column.getIsPinned() ? (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="-mr-1 size-7 shadow-none"
                              onClick={() => header.column.pin(false)}
                              aria-label={`Unpin ${header.column.id as string} column`}
                              title={`Unpin ${header.column.id as string} column`}
                            >
                              <PinOffIcon className="opacity-60" size={16} aria-hidden="true" />
                            </Button>
                          ) : (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="-mr-1 size-7 shadow-none"
                                  aria-label={`Pin options for ${header.column.id as string} column`}
                                  title={`Pin options for ${header.column.id as string} column`}
                                >
                                  <EllipsisIcon className="opacity-60" size={16} aria-hidden="true" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => header.column.pin('left')}>
                                  <ArrowLeftToLineIcon size={16} className="opacity-60" aria-hidden="true" />
                                  Stick to left
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => header.column.pin('right')}>
                                  <ArrowRightToLineIcon size={16} className="opacity-60" aria-hidden="true" />
                                  Stick to right
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          ))}
                        {header.column.getCanResize() && (
                          <div
                            {...{
                              onDoubleClick: () => header.column.resetSize(),
                              onMouseDown: header.getResizeHandler(),
                              onTouchStart: header.getResizeHandler(),
                              className:
                                'absolute top-0 h-full w-4 cursor-col-resize user-select-none touch-none -right-2 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:-translate-x-px'
                            }}
                          />
                        )}
                      </div>
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={`fragment-${row.id}`}>
                  <TableRow
                    className={onRowClick ? 'cursor-pointer' : ''}
                    onClick={() => onRowClick && onRowClick(row.original)}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const { column } = cell
                      const isPinned = column.getIsPinned()
                      const isLastLeftPinned = isPinned === 'left' && column.getIsLastColumn('left')
                      const isFirstRightPinned = isPinned === 'right' && column.getIsFirstColumn('right')
                      return (
                        <TableCell
                          key={cell.id}
                          className="[&[data-pinned][data-last-col]]:border-border data-pinned:bg-background/90 truncate data-pinned:backdrop-blur-xs [&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right][data-last-col=right]]:border-l"
                          style={{ ...getPinningStyles(column) }}
                          data-pinned={isPinned || undefined}
                          data-last-col={isLastLeftPinned ? 'left' : isFirstRightPinned ? 'right' : undefined}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                  {row.getIsExpanded() && renderSubComponent && (
                    <TableRow>
                      <TableCell colSpan={row.getVisibleCells().length}>{renderSubComponent({ row })}</TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination && <DataTablePagination table={table} />}
    </div>
  )
}
