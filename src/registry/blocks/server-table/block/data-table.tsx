import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  type Table as TanstackTable,
  flexRender,
  Row,
} from "@tanstack/react-table";
import React from "react";
import { DataTablePagination } from "./data-table-pagination";
import { cn } from "@/lib/utils";

export interface DataTableProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The table instance returned from useDataTable hook with pagination, sorting, filtering, etc.
   * @type TanstackTable<TData>
   */
  table: TanstackTable<TData>;
  /**
   * Callback for handling row clicks.
   * @param row - The row data that was clicked.
   */
  onRowClick?: (row: TData) => void;

  /**
   * Function to render a sub-component for expandable rows.
   * @param props - The row properties.
   * @returns A React element.
   */
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactElement;

  /**
   * Whether to show pagination controls.
   * @default true
   */
  showPagination?: boolean;
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
  return (
    <div
      className={cn("w-full space-y-2.5 overflow-auto", className)}
      {...props}
    >
      {children}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={`fragment-${row.id}`}>
                  <TableRow
                    className={onRowClick ? "cursor-pointer" : ""}
                    onClick={() => onRowClick && onRowClick(row.original)}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && renderSubComponent && (
                    <TableRow>
                      <TableCell colSpan={row.getVisibleCells().length}>
                        {renderSubComponent({ row })}
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination && <DataTablePagination table={table} />}
    </div>
  );
}
