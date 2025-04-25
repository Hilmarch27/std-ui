import '@tanstack/react-table'
import { ColumnDef, Row, RowData } from '@tanstack/react-table'
import { ZodType, ZodTypeDef } from 'zod'
import { DataTableConfig } from '../config/table'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    disabled?: boolean | ((row: Row<TData>) => boolean)
    variant?: FilterVariant
    label?: string
    placeholder?: string
    schema?: ZodType<any, ZodTypeDef, any>
    options?: Option[]
    icon?: React.FC<React.SVGProps<SVGSVGElement>>
  }

  interface TableMeta<TData extends RowData> {
    editedRows?: Record<string, boolean>
    setEditedRows?: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
    validRows?: Record<string, Record<string, boolean>>
    setValidRows?: React.Dispatch<React.SetStateAction<Record<string, Record<string, boolean>>>>
    rowOriginal?: TData | undefined
    setRowOriginal?: React.Dispatch<React.SetStateAction<TData | undefined>>
    revertData?: (rowIndex: number) => void
    updateRow?: (rowIndex: number) => void
    updateData?: (rowIndex: number, columnId: string, value: TData, isValid: boolean) => void
    createRow?: () => void
    removeRow?: (rowIndex: number) => void
    removeSelectedRows?: (selectedRows: number[]) => void
    onRemove?: (id: string) => void
    onUpdate?: (payload: TData) => void
    pendingCreate?: PendingCreate<TData> | null
    setPendingCreate?: React.Dispatch<React.SetStateAction<PendingCreate<TData> | null>>
  }
}

export type Option = {
  label: string
  value: string
  count?: number
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
}

export type FilterVariant = DataTableConfig['filterVariants'][number]
