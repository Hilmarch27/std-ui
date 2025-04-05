import "@tanstack/react-table";
import { ColumnDef, Row, RowData } from "@tanstack/react-table";

export interface BaseData {
  id: string;
}

export interface PendingCreate<TData> {
  data: TData;
  index: number;
}

export interface RowValidationState {
  isValid: boolean;
  fields: Record<string, boolean>;
}

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    required?: boolean;
    disabled?: boolean | ((row: Row<TData>) => boolean);
    type?: "text" | "number" | "date" | "select" | "combobox" | "password";
    pattern?: string;
    validationMessage?: string;
    options?: { label: string; value: string }[];
    validate?: (value: TData) => boolean;
  }

  interface TableMeta<TData extends RowData> {
    editedRows?: Record<string, boolean>;
    setEditedRows?: React.Dispatch<
      React.SetStateAction<Record<string, boolean>>
    >;
    validRows?: Record<string, Record<string, boolean>>;
    setValidRows?: React.Dispatch<
      React.SetStateAction<Record<string, Record<string, boolean>>>
    >;
    rowOriginal?: TData | undefined;
    setRowOriginal?: React.Dispatch<React.SetStateAction<TData | undefined>>;
    revertData?: (rowIndex: number) => void;
    updateRow?: (rowIndex: number) => void;
    updateData?: (
      rowIndex: number,
      columnId: string,
      value: TData,
      isValid: boolean
    ) => void;
    createRow?: () => void;
    removeRow?: (rowIndex: number) => void;
    removeSelectedRows?: (selectedRows: number[]) => void;
    onRemove?: (id: string) => void;
    onUpdate?: (payload: TData) => void;
    pendingCreate?: PendingCreate<TData> | null;
    setPendingCreate?: React.Dispatch<
      React.SetStateAction<PendingCreate<TData> | null>
    >;
  }
}