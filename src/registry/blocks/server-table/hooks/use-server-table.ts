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
  TableState,
  TableOptions,
  RowSelectionState
} from '@tanstack/react-table'
import React from 'react'
import { parseAsArrayOf, parseAsInteger, parseAsString, Parser, useQueryState, useQueryStates } from 'nuqs'
import { sortByToState, stateToSortBy } from '../lib/table-utils'
import { useDebouncedCallback } from '@/registry/hooks/use-debounced-callback'
import { useEditableTableFeatures } from './use-edit-table'
import { validateEditableProps } from '../lib/config/table'

interface UseDataTableProps<TData>
  extends Omit<
      TableOptions<TData>,
      'state' | 'pageCount' | 'getCoreRowModel' | 'manualFiltering' | 'manualPagination' | 'manualSorting'
    >,
    Required<Pick<TableOptions<TData>, 'pageCount'>> {
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

export function useDataTable<TData>(props: UseDataTableProps<TData>) {
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
    pageCount = -1,
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

  // * states
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(initialState?.rowSelection ?? {})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(initialState?.columnVisibility ?? {})

  const [editedRows, setEditedRows] = React.useState<Record<string, boolean>>({})

  const [validRows, setValidRows] = React.useState<Record<string, Record<string, boolean>>>({})
  const [pendingCreate, setPendingCreate] = React.useState<{
    data: TData
    index: number
  } | null>(null)
  const [expanded, setExpanded] = React.useState<ExpandedState>({})

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1).withOptions({ shallow: false }))
  const [perPage, setPerPage] = useQueryState(
    'perPage',
    parseAsInteger
      .withDefault(10)
      .withOptions({ shallow: false })
      .withDefault(initialState?.pagination?.pageSize ?? 10)
  )

  // * row actions
  const handleOnRemove = (id: string) => {
    onRemove!(id)
  }

  const handleUpdate = (payload: TData) => {
    onUpdate!(payload)
  }

  // * paginate
  const pagination: PaginationState = {
    pageIndex: page - 1, // zero-based index -> one-based index
    pageSize: perPage
  }

  function onPaginationChange(updaterOrValue: Updater<PaginationState>) {
    if (typeof updaterOrValue === 'function') {
      const newPagination = updaterOrValue(pagination)
      void setPage(newPagination.pageIndex + 1)
      void setPerPage(newPagination.pageSize)
    } else {
      void setPage(updaterOrValue.pageIndex + 1)
      void setPerPage(updaterOrValue.pageSize)
    }
  }

  // * sorting
  const [sorting, setSorting] = useQueryState(
    'sort',
    parseAsString.withDefault(stateToSortBy(initialState?.sorting) ?? '').withOptions({ shallow: false })
  )
  const sortingState = sortByToState(sorting)

  const onSortingChange = React.useCallback(
    (updaterOrValue: Updater<SortingState>) => {
      const newSortingState = typeof updaterOrValue === 'function' ? updaterOrValue(sortingState) : updaterOrValue

      // Pastikan kita tidak pernah melewatkan undefined ke setSorting
      const newSortValue = stateToSortBy(newSortingState)
      return setSorting(newSortValue)
    },
    [sorting, setSorting]
  )

  // * filtering
  const filterableColumns = React.useMemo(() => {
    return columns.filter((column) => column.enableColumnFilter)
  }, [columns])

  const filterParsers = React.useMemo(() => {
    return filterableColumns.reduce<Record<string, Parser<string> | Parser<string[]>>>((acc, column) => {
      if (column.meta?.options) {
        acc[column.id ?? ''] = parseAsArrayOf(parseAsString, ',').withOptions({ shallow: false })
      } else {
        acc[column.id ?? ''] = parseAsString.withOptions({ shallow: false })
      }
      return acc
    }, {})
  }, [filterableColumns])

  const [filterValues, setFilterValues] = useQueryStates(filterParsers)

  const debouncedSetFilterValues = useDebouncedCallback((values: typeof filterValues) => {
    void setPage(1)
    void setFilterValues(values)
  }, 300)

  const initialColumnFilters: ColumnFiltersState = React.useMemo(() => {
    return Object.entries(filterValues).reduce<ColumnFiltersState>((filters, [key, value]) => {
      if (value !== null) {
        const processedValue = Array.isArray(value)
          ? value
          : typeof value === 'string' && /[^a-zA-Z0-9]/.test(value)
          ? value.split(/[^a-zA-Z0-9]+/).filter(Boolean)
          : [value]

        filters.push({
          id: key,
          value: processedValue
        })
      }
      return filters
    }, [])
  }, [filterValues])

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(initialColumnFilters)

  const onColumnFiltersChange = React.useCallback(
    (updaterOrValue: Updater<ColumnFiltersState>) => {
      setColumnFilters((prev) => {
        const next = typeof updaterOrValue === 'function' ? updaterOrValue(prev) : updaterOrValue

        const filterUpdates = next.reduce<Record<string, string | string[] | null>>((acc, filter) => {
          if (filterableColumns.find((column) => column.id === filter.id)) {
            acc[filter.id] = filter.value as string | string[]
          }
          return acc
        }, {})

        for (const prevFilter of prev) {
          if (!next.some((filter) => filter.id === prevFilter.id)) {
            filterUpdates[prevFilter.id] = null
          }
        }

        debouncedSetFilterValues(filterUpdates)
        return next
      })
    },
    [debouncedSetFilterValues, filterableColumns]
  )

  /**
   ** Table Configuration
   */
  const table = useReactTable({
    ...tableProps,
    initialState,
    data,
    columns,
    pageCount,
    state: {
      pagination,
      sorting: sortingState,
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
    onPaginationChange,
    onRowSelectionChange: setRowSelection,
    onSortingChange,
    onColumnFiltersChange,
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
      ...editableMeta
    },
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true
  })

  return { table }
}
