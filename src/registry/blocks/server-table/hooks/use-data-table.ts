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

interface UseDataTableProps<TData>
  extends Omit<
      TableOptions<TData>,
      'state' | 'pageCount' | 'getCoreRowModel' | 'manualFiltering' | 'manualPagination' | 'manualSorting'
    >,
    Required<Pick<TableOptions<TData>, 'pageCount'>> {
  columns: ColumnDef<TData>[]
  data: TData[]
  originalData?: TData[]
  createEmptyRow?: () => Partial<TData>
  setData?: React.Dispatch<React.SetStateAction<TData[]>>
  updateRow?: (id: string, payload: TData) => void
  createRow?: (payload: TData) => void
  removeRow?: (id: string) => void
  getRowCanExpand?: (row: Row<TData>) => boolean
  onRemove?: (id: string) => void
  onUpdate?: (payload: TData) => void
  initialState?: Partial<TableState>
}

export function useDataTable<TData>(props: UseDataTableProps<TData>) {
  const {
    columns,
    data,
    originalData,
    initialState,
    createEmptyRow,
    setData,
    updateRow,
    createRow,
    removeRow,
    getRowCanExpand,
    onRemove,
    onUpdate,
    pageCount = -1,
    ...tableProps
  } = props

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

  // * editable functions
  const handleRevertData = (rowIndex: number) => {
    if (pendingCreate?.index === rowIndex) {
      setData!((old) => old.filter((_, index) => index !== rowIndex))
      setPendingCreate(null)
      setValidRows((old) => {
        const newValidRows = { ...old }
        delete newValidRows[rowIndex]
        return newValidRows
      })
    } else {
      setData!((old) => old.map((row, index) => (index === rowIndex ? originalData![rowIndex]! : row)))
    }
  }

  const handleUpdateRow = (rowIndex: number, rowId: string) => {
    if (pendingCreate?.index === rowIndex && createRow && data[rowIndex]) {
      createRow(data[rowIndex])
      setPendingCreate(null)
    } else if (updateRow && data[rowIndex]) {
      updateRow(rowId, data[rowIndex])
    }
  }

  const handleUpdateData = (rowIndex: number, columnId: string, value: TData, isValid: boolean) => {
    setData!((old: TData[]) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex]!,
            [columnId]: value
          }
        }
        return row
      })
    )
    setValidRows((old) => ({
      ...old,
      [rowIndex]: { ...old[rowIndex], [columnId]: isValid }
    }))
  }

  const handleCreateRow = () => {
    if (!createEmptyRow) throw new Error('createEmptyRow required')
    const newRow = createEmptyRow() as TData
    setData!((old) => [newRow, ...old])

    setPendingCreate({
      data: newRow,
      index: 0
    })

    setEditedRows((old) => ({
      ...old,
      create: true
    }))
  }

  const handleRemoveRow = (rowIndex: number, rowId: string) => {
    if (pendingCreate?.index === rowIndex) {
      setData!((old) => old.filter((_, index) => index !== rowIndex))
      setPendingCreate(null)
      setValidRows((old) => {
        const newValidRows = { ...old }
        delete newValidRows[rowIndex]
        return newValidRows
      })
    } else if (removeRow) {
      removeRow(rowId)
    }
  }

  const handleRemoveSelectedRows = (rowIds: string[]) => {
    rowIds.forEach((rowid, rowIndex) => {
      if (pendingCreate?.index !== rowIndex && removeRow) {
        removeRow(rowid)
      }
    })
  }

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
      revertData: handleRevertData,
      updateRow: handleUpdateRow,
      updateData: handleUpdateData,
      createRow: handleCreateRow,
      removeRow: handleRemoveRow,
      removeSelectedRows: handleRemoveSelectedRows
    },
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true
  })

  return { table }
}
