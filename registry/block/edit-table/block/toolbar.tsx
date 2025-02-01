"use client";

import { Table } from "@tanstack/react-table";
import { UserRoundPlus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditableViewOptions } from "./view-options";
import { EditableFacetedFilter } from "./faceted-filter";

interface EditableToolbarProps<TData> {
  table: Table<TData>;
  facetedFilters?: {
    column: string;
    title: string;
    options: {
      label: string;
      value: string;
      icon?: React.ComponentType<{ className?: string }>;
    }[];
  }[];
}
export function EditableToolbar<TData>({
  table,
  facetedFilters,
}: EditableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const meta = table.options.meta;
  const selectedRows = table.getSelectedRowModel().rows;

  const removeRows = () => {
    meta?.removeSelectedRows(
      table.getSelectedRowModel().rows.map((row) => row.index)
    );
    table.resetRowSelection();
  };
  const global = table.getState().globalFilter;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={global ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {facetedFilters?.map((filter) => (
          <EditableFacetedFilter
            key={filter.column}
            column={table.getColumn(filter.column)}
            title={filter.title}
            options={filter.options}
          />
        ))}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}

        {selectedRows.length > 0 && (
          <Button variant="destructive" size={"sm"} onClick={removeRows}>
            {`Delete ${selectedRows.length} Selected`}
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          disabled={!!meta?.pendingCreate}
          onClick={meta?.createRow}
          variant="outline"
          size="sm"
          className="h-8"
        >
          Create New
          <UserRoundPlus className="ml-2 h-4 w-4" />
        </Button>
        <EditableViewOptions table={table} />
      </div>
    </div>
  );
}
