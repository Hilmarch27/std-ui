import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import React from "react";
import { EditableToolbar } from "./toolbar";
import { EditablePagination } from "./pagination";
import { BaseData, PendingCreate } from "./types";

interface EditTableProps<TData extends BaseData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  originalData: TData[];
  createEmptyRow: () => TData;
  setData: React.Dispatch<React.SetStateAction<TData[]>>;
  updateRow: (id: string, payload: TData) => void;
  createRow?: (payload: TData) => void;
  removeRow: (id: string) => void;
  facetedFilters?: {
    column: string;
    title: string;
    options: {
      label: string;
      value: string;
      icon?: React.ComponentType<{ className?: string }>;
    }[];
  }[];
  onRowClick?: (row: TData) => void;
}

export function Editable<TData extends BaseData, TValue>({
  columns,
  data,
  setData,
  createEmptyRow,
  updateRow,
  createRow,
  removeRow,
  originalData,
  facetedFilters,
  onRowClick,
}: EditTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [editedRows, setEditedRows] = React.useState<Record<string, boolean>>(
    {}
  );
  const [validRows, setValidRows] = React.useState<
    Record<string, Record<string, boolean>>
  >({});
  const [pendingCreate, setPendingCreate] =
    React.useState<PendingCreate<TData> | null>(null);

  // Initialize validation state for new row with all required fields as false
  const initializeValidationState = () => {
    const validationState: Record<string, boolean> = {};

    columns.forEach((column: any) => {
      if (column.meta?.required) {
        validationState[column.accessorKey as string] = false;
      }
    });

    return validationState;
  };

  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      expanded,
    },
    globalFilterFn: "includesString",
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: (row) => Boolean(row.original.children),
    meta: {
      editedRows,
      setEditedRows,
      validRows,
      setValidRows,
      pendingCreate,
      setPendingCreate,
      revertData: (rowIndex: number) => {
        if (pendingCreate?.index === rowIndex) {
          setData((old) => old.filter((_, index) => index !== rowIndex));
          setPendingCreate(null);
          setValidRows((old) => {
            const newValidRows = { ...old };
            delete newValidRows[rowIndex];
            return newValidRows;
          });
        } else {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        }
      },
      updateRow: (rowIndex: number) => {
        if (pendingCreate?.index === rowIndex) {
          createRow!(data[rowIndex]);
          setPendingCreate(null);
        } else {
          updateRow(data[rowIndex].id, data[rowIndex]);
        }
      },
      updateData: (
        rowIndex: number,
        columnId: string,
        value: TData,
        isValid: boolean
      ) => {
        setData((old: TData[]) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
        setValidRows((old) => ({
          ...old,
          [rowIndex]: { ...old[rowIndex], [columnId]: isValid },
        }));
      },
      createRow: () => {
        const newRow = createEmptyRow();
        setData((old) => [newRow, ...old]);

        // Set pending create
        setPendingCreate({
          data: newRow,
          index: 0,
        });

        // Enable edit mode for the new row
        setEditedRows((old) => ({
          ...old,
          0: true,
        }));

        // Initialize validation state with all required fields as false
        const initialValidation = initializeValidationState();
        setValidRows((old) => ({
          ...old,
          0: initialValidation,
        }));
      },
      removeRow: (rowIndex: number) => {
        if (pendingCreate?.index === rowIndex) {
          setData((old) => old.filter((_, index) => index !== rowIndex));
          setPendingCreate(null);
          setValidRows((old) => {
            const newValidRows = { ...old };
            delete newValidRows[rowIndex];
            return newValidRows;
          });
        } else {
          removeRow(data[rowIndex].id);
        }
      },
      removeSelectedRows: (selectedRows: number[]) => {
        selectedRows.forEach((rowIndex) => {
          if (pendingCreate?.index !== rowIndex) {
            removeRow(data[rowIndex].id);
          }
        });
      },
    },
  });

  const renderExpandedContent = (row: TData) => {
    // const length = row.children?.length === 9
    return (
      <TableRow key={`expanded-${row.id}`}>
        <TableCell
          colSpan={columns.length}
          className="border-4 border-muted p-0"
        >
          <Table className="border-t">
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[100px]">No</TableHead>
                <TableHead>Name City</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {row.children?.length ? (
                row.children.map((city, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{city.city}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="text-center text-muted-foreground"
                  >
                    No cities found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="space-y-4">
      <EditableToolbar table={table} facetedFilters={facetedFilters} />

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
          <TableBody className="">
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
                  {row.getIsExpanded() && renderExpandedContent(row.original)}
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

      <EditablePagination table={table} />
    </div>
  );
}
