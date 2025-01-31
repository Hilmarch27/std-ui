export interface Student {
  id: string;
  studentNumber: string;
  name: string;
  dateOfBirth: string;
  major: string;
  createdAt: string;
}

// types.ts
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
    editedRows: Record<string, boolean>;
    setEditedRows: React.Dispatch<
      React.SetStateAction<Record<string, boolean>>
    >;
    validRows: Record<string, Record<string, boolean>>;
    setValidRows: React.Dispatch<
      React.SetStateAction<Record<string, Record<string, boolean>>>
    >;
    revertData: (rowIndex: number) => void;
    updateRow: (rowIndex: number) => void;
    updateData: (
      rowIndex: number,
      columnId: string,
      value: TData,
      isValid: boolean
    ) => void;
    createRow: () => void;
    removeRow: (rowIndex: number) => void;
    removeSelectedRows: (selectedRows: number[]) => void;
    pendingCreate: PendingCreate<TData> | null;
    setPendingCreate: React.Dispatch<
      React.SetStateAction<PendingCreate<TData> | null>
    >;
  }
}

/**
 ** types props EdiTable
 */
/**
 * EdiTableProps is the interface defining the properties for the Editable component.
 *
 * @template TData - The type of the row data.
 * @template TValue - The type of the cell value.
 */
export interface EdiTableProps<TData extends BaseData, TValue> {
  /**
   * Column definitions for the table.
   */
  columns: ColumnDef<TData, TValue>[];

  /**
   * Data to display in the table.
   */
  data: TData[];

  /**
   * Original data for tracking changes.
   */
  originalData?: TData[];

  /**
   * Function to create an empty row.
   */
  createEmptyRow?: () => TData;

  /**
   * State setter for updating table data.
   */
  setData?: React.Dispatch<React.SetStateAction<TData[]>>;

  /**
   * Callback to update an existing row.
   * @param id - The ID of the row to update.
   * @param payload - The new data for the row.
   */
  updateRow?: (id: string, payload: TData) => void;

  /**
   * Callback to create a new row.
   * @param payload - The data for the new row.
   */
  createRow?: (payload: TData) => void;

  /**
   * Callback to remove a row.
   * @param id - The ID of the row to remove.
   */
  removeRow?: (id: string) => void;

  /**
   * Faceted filter configuration for the table.
   */
  facetedFilters?: {
    column: string;
    title: string;
    options: {
      label: string;
      value: string;
      icon?: React.ComponentType<{ className?: string }>;
    }[];
  }[];

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
   * Determines if a row can be expanded.
   * @param row - The row data.
   * @returns True if the row can be expanded.
   */
  getRowCanExpand?: (row: Row<TData>) => boolean;

  /**
   * Whether to show the toolbar.
   * @default true
   */
  toolbar?: boolean;

  /**
   * Whether to show pagination controls.
   * @default true
   */
  pagination?: boolean;
}