// types.d.ts
import "@tanstack/react-table";
import {  Row, RowData } from "@tanstack/react-table";
// example types
export interface Student {
  id: string;
  studentNumber: string;
  name: string;
  dateOfBirth: string;
  major: string;
  createdAt: string;
}

export interface BaseData {
  id: string;
  children?: any[];
}

export interface PendingCreate<TData> {
  data: TData;
  index: number;
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
    pendingCreate?: PendingCreate<TData> | null;
    setPendingCreate?: React.Dispatch<
      React.SetStateAction<PendingCreate<TData> | null>
    >;
  }
}
