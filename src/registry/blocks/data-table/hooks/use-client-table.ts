import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  TableOptions,
  TableState,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table'
import { useEditableTableFeatures } from './use-edit-table'
import { validateEditableProps } from '../lib/config/table'
import { useState } from 'react'

interface ClientTableProps<TData>
  extends Omit<TableOptions<TData>, 'getCoreRowModel' | 'manualFiltering' | 'manualPagination' | 'manualSorting'> {
  columns: ColumnDef<TData>[]
  data: TData[]
  getRowCanExpand?: (row: Row<TData>) => boolean
  onRemove?: (id: string) => void
  onUpdate?: (payload: TData) => void
  initialState?: Partial<TableState>
  // * editable props
  originalData?: TData[]
  fieldRow?: Partial<TData>
  setData?: React.Dispatch<React.SetStateAction<TData[]>>
  updateRow?: (id: string, payload: TData) => void
  createRow?: (payload: TData) => void
  removeRow?: (id: string) => void
  /**
   * Set to true to enable editable row behavior.
   * Required if using props like setData, updateRow, createRow, etc.
   */
  isEditable?: boolean
}

export function useClientTable<TData>(props: ClientTableProps<TData>) {
  const {
    columns,
    data,
    originalData,
    initialState,
    fieldRow,
    setData,
    updateRow,
    createRow,
    removeRow,
    getRowCanExpand,
    onRemove,
    onUpdate,
    isEditable = false,
    ...tableProps
  } = props

  let editableMeta = {}

  if (isEditable && setData) {
    // * validate editable props
    validateEditableProps<TData>(isEditable, {
      setData,
      updateRow,
      createRow,
      removeRow,
      fieldRow,
      originalData
    })

    // * push editable props to meta
    const editable = useEditableTableFeatures<TData>({
      data,
      setData,
      updateRow: updateRow!, // safe because validated
      createRow: createRow!, // safe because validated
      removeRow: removeRow!, // safe because validated
      fieldRow: fieldRow!, // safe because validated
      originalData: originalData! // safe because validated
    })
    editableMeta = editable.editableMeta
  }

  // * state for cleint table
  const [rowSelection, setRowSelection] = useState(initialState?.rowSelection ?? {})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialState?.columnVisibility ?? {})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(initialState?.columnFilters ?? [])
  console.log('columnFilters', columnFilters)
  const [sorting, setSorting] = useState<SortingState>(initialState?.sorting ?? [])
  const [expanded, setExpanded] = useState<ExpandedState>(initialState?.expanded ?? {})

  // * state for editable rows
  const [editedRows, setEditedRows] = useState<Record<string, boolean>>({})
  const [validRows, setValidRows] = useState<Record<string, Record<string, boolean>>>({})
  const [pendingCreate, setPendingCreate] = useState<{
    data: TData
    index: number
  } | null>(null)

  // * row actions
  const handleOnRemove = (id: string) => {
    if (!onRemove) throw new Error('onRemove function is required')
    onRemove(id)
  }

  const handleUpdate = (payload: TData) => {
    if (!onUpdate) throw new Error('onUpdate function is required')
    onUpdate(payload)
  }

  const table = useReactTable({
    ...tableProps,
    initialState,
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      expanded
    },
    defaultColumn: {
      ...tableProps.defaultColumn,
      enableColumnFilter: false
    },
    columnResizeMode: 'onChange',
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
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
      ...editableMeta
    }
  })

  return { table }
}
