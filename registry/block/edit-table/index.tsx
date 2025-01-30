import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import React from "react";
import { EditableToolbar } from "./toolbar";
import { EditablePagination } from "./pagination";
import { BaseData, EdiTableProps } from "./types";
import { useEditable } from "./use-editable";


export function Editable<TData extends BaseData, TValue>({
  columns,
  data,
  originalData,
  createEmptyRow,
  setData,
  updateRow,
  createRow,
  removeRow,
  facetedFilters,
  onRowClick,
  renderSubComponent,
  getRowCanExpand,
  toolbar = true,
  pagination = true,
}: EdiTableProps<TData, TValue>) {
  const table = useEditable({
    columns,
    data,
    originalData,
    createEmptyRow,
    setData,
    updateRow,
    createRow,
    removeRow,
    getRowCanExpand,
  });

  return (
    <div className="space-y-4">
      {toolbar && (
        <EditableToolbar table={table} facetedFilters={facetedFilters} />
      )}

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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && <EditablePagination table={table} />}
    </div>
  );
}
