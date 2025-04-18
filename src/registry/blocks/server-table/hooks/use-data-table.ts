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
  PaginationState,
  Updater,
} from "@tanstack/react-table";
import React from "react";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

interface UseDataTableProps<TData extends { id: string }> {
  columns: ColumnDef<TData>[];
  data: TData[];
  originalData?: TData[];
  createEmptyRow?: () => TData;
  setData?: React.Dispatch<React.SetStateAction<TData[]>>;
  updateRow?: (id: string, payload: TData) => void;
  createRow?: (payload: TData) => void;
  removeRow?: (id: string) => void;
  getRowCanExpand?: (row: Row<TData>) => boolean;
  onRemove?: (id: string) => void;
  onUpdate?: (payload: TData) => void;
  pageCount?: number;
}

export function useDataTable<TData extends { id: string }>({
  columns,
  data,
  originalData,
  createEmptyRow,
  setData,
  updateRow,
  createRow,
  removeRow,
  getRowCanExpand,
  onRemove,
  onUpdate,
  pageCount = -1,
  ...props
}: UseDataTableProps<TData>) {
  // * states
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
  const [pendingCreate, setPendingCreate] = React.useState<{
    data: TData;
    index: number;
  } | null>(null);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false })
  );
  const [perPage, setPerPage] = useQueryState(
    "perPage",
    parseAsInteger.withDefault(10).withOptions({ shallow: false })
  );

  const [globalFilter, setGlobalFilter] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({ shallow: false })
  );

  // * helper functions
  const initializeValidationState = () => {
    const validationState: Record<string, boolean> = {};
    columns.forEach((column: any) => {
      if (column.meta?.zod) {
        validationState[column.accessorKey as string] = false;
      }
    });
    return validationState;
  };

  // * row actions
  const handleOnRemove = (id: string) => {
    onRemove!(id);
  };

  const handleUpdate = (payload: TData) => {
    onUpdate!(payload);
  };

  // * paginate
  const pagination: PaginationState = {
    pageIndex: page - 1, // zero-based index -> one-based index
    pageSize: perPage,
  };

  function onPaginationChange(updaterOrValue: Updater<PaginationState>) {
    if (typeof updaterOrValue === "function") {
      const newPagination = updaterOrValue(pagination);
      void setPage(newPagination.pageIndex + 1);
      void setPerPage(newPagination.pageSize);
    } else {
      void setPage(updaterOrValue.pageIndex + 1);
      void setPerPage(updaterOrValue.pageSize);
    }
  }

  // * editable functions
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
          index === rowIndex ? originalData![rowIndex]! : row
        )
      );
    }
  };

  const handleUpdateRow = (rowIndex: number) => {
    if (pendingCreate?.index === rowIndex) {
      createRow!(data[rowIndex]!);
      setPendingCreate(null);
    } else {
      updateRow!(data[rowIndex]!.id, data[rowIndex]!);
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
            ...old[rowIndex]!,
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
      removeRow!(data[rowIndex]!.id);
    }
  };

  const handleRemoveSelectedRows = (selectedRows: number[]) => {
    selectedRows.forEach((rowIndex) => {
      if (pendingCreate?.index !== rowIndex) {
        removeRow!(data[rowIndex]!.id);
      }
    });
  };

  /**
   ** Table Configuration
   */
  const table = useReactTable({
    ...props,
    data,
    columns,
    pageCount,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      expanded,
      globalFilter,
    },
    globalFilterFn: "includesString",
    enableRowSelection: true,
    onPaginationChange,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
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
      onRemove: handleOnRemove,
      onUpdate: handleUpdate,
      revertData: handleRevertData,
      updateRow: handleUpdateRow,
      updateData: handleUpdateData,
      createRow: handleCreateRow,
      removeRow: handleRemoveRow,
      removeSelectedRows: handleRemoveSelectedRows,
    },
    manualPagination: true,
    manualFiltering: true,
  });

  return { table };
}
