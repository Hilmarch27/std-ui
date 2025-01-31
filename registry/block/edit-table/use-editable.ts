import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Row,
} from "@tanstack/react-table";
import React from "react";
import { BaseData, PendingCreate } from "./types";

interface UseEditableProps<TData extends BaseData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  originalData?: TData[];
  createEmptyRow?: () => TData;
  setData?: React.Dispatch<React.SetStateAction<TData[]>>;
  updateRow?: (id: string, payload: TData) => void;
  createRow?: (payload: TData) => void;
  removeRow?: (id: string) => void;
  getRowCanExpand?: (row: Row<TData>) => boolean;
}

export function useEditable<TData extends BaseData, TValue>({
  columns,
  data,
  originalData,
  createEmptyRow,
  setData,
  updateRow,
  createRow,
  removeRow,
  getRowCanExpand,
}: UseEditableProps<TData, TValue>) {

  /**
   ** States
   */
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
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  /**
   ** Helper Functions
   */
  const initializeValidationState = () => {
    const validationState: Record<string, boolean> = {};
    columns.forEach((column: any) => {
      if (column.meta?.required) {
        validationState[column.accessorKey as string] = false;
      }
    });
    return validationState;
  };

  /**
   ** EdiTable Operations
   */
  const handleRevertData = (rowIndex: number) => {
    if (pendingCreate?.index === rowIndex) {
      setData!((old) => old.filter((_, index) => index !== rowIndex));
      setPendingCreate(null);
      setValidRows((old) => {
        const newValidRows = { ...old };
        delete newValidRows[rowIndex];
        return newValidRows;
      });
    } else {
      setData!((old) =>
        old.map((row, index) =>
          index === rowIndex ? originalData![rowIndex] : row
        )
      );
    }
  };

  const handleUpdateRow = (rowIndex: number) => {
    if (pendingCreate?.index === rowIndex) {
      createRow!(data[rowIndex]);
      setPendingCreate(null);
    } else {
      updateRow!(data[rowIndex].id, data[rowIndex]);
    }
  };

  const handleUpdateData = (
    rowIndex: number,
    columnId: string,
    value: TData,
    isValid: boolean
  ) => {
    setData!((old: TData[]) =>
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
  };

  const handleCreateRow = () => {
    const newRow = createEmptyRow!();
    setData!((old) => [newRow, ...old]);

    setPendingCreate({
      data: newRow,
      index: 0,
    });

    setEditedRows((old) => ({
      ...old,
      0: true,
    }));

    const initialValidation = initializeValidationState();
    setValidRows((old) => ({
      ...old,
      0: initialValidation,
    }));
  };

  const handleRemoveRow = (rowIndex: number) => {
    if (pendingCreate?.index === rowIndex) {
      setData!((old) => old.filter((_, index) => index !== rowIndex));
      setPendingCreate(null);
      setValidRows((old) => {
        const newValidRows = { ...old };
        delete newValidRows[rowIndex];
        return newValidRows;
      });
    } else {
      removeRow!(data[rowIndex].id);
    }
  };

  const handleRemoveSelectedRows = (selectedRows: number[]) => {
    selectedRows.forEach((rowIndex) => {
      if (pendingCreate?.index !== rowIndex) {
        removeRow!(data[rowIndex].id);
      }
    });
  };

  /**
   ** Table Configuration
   */
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
    getRowCanExpand,
    meta: {
      editedRows,
      setEditedRows,
      validRows,
      setValidRows,
      pendingCreate,
      setPendingCreate,
      revertData: handleRevertData,
      updateRow: handleUpdateRow,
      updateData: handleUpdateData,
      createRow: handleCreateRow,
      removeRow: handleRemoveRow,
      removeSelectedRows: handleRemoveSelectedRows,
    },
  });

  return table;
}
