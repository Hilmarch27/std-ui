import { useState } from 'react'

export function useEditableTableFeatures<TData>({
  data,
  setData,
  updateRow,
  createRow,
  removeRow,
  fieldRow,
  originalData
}: {
  data: TData[]
  setData: React.Dispatch<React.SetStateAction<TData[]>>
  updateRow: (id: string, payload: TData) => void
  createRow: (payload: TData) => void
  removeRow: (id: string) => void
  fieldRow: Partial<TData>
  originalData: TData[]
}) {
  const [editedRows, setEditedRows] = useState<Record<string, boolean>>({})
  const [validRows, setValidRows] = useState<Record<string, Record<string, boolean>>>({})
  const [pendingCreate, setPendingCreate] = useState<{ data: TData; index: number } | null>(null)

  const handleRevertData = (rowIndex: number) => {
    if (pendingCreate?.index === rowIndex) {
      setData((old) => old.filter((_, index) => index !== rowIndex))
      setPendingCreate(null)
      setValidRows((old) => {
        const newValid = { ...old }
        delete newValid[rowIndex]
        return newValid
      })
    } else {
      setData((old) => old.map((row, index) => (index === rowIndex ? originalData[rowIndex]! : row)))
    }
  }

  const handleUpdateRow = (rowIndex: number, rowId: string) => {
    if (pendingCreate?.index === rowIndex && createRow) {
      createRow(data[rowIndex]!)
      setPendingCreate(null)
    } else if (updateRow) {
      updateRow(rowId, data[rowIndex]!)
    }
  }

  const handleUpdateData = (rowIndex: number, columnId: string, value: TData, isValid: boolean) => {
    setData((old) => old.map((row, index) => (index === rowIndex ? { ...row, [columnId]: value } : row)))
    setValidRows((old) => ({
      ...old,
      [rowIndex]: { ...old[rowIndex], [columnId]: isValid }
    }))
  }

  const handleCreateRow = () => {
    const newRow = fieldRow as TData
    setData((old) => [newRow, ...old])
    setPendingCreate({ data: newRow, index: 0 })
    setEditedRows((old) => ({ ...old, create: true }))
  }

  const handleRemoveRow = (rowIndex: number, rowId: string) => {
    if (pendingCreate?.index === rowIndex) {
      setData((old) => old.filter((_, index) => index !== rowIndex))
      setPendingCreate(null)
      setValidRows((old) => {
        const newValid = { ...old }
        delete newValid[rowIndex]
        return newValid
      })
    } else if (removeRow) {
      removeRow(rowId)
    }
  }

  const handleRemoveSelectedRows = (rowIds: string[]) => {
    rowIds.forEach((rowId) => {
      if (removeRow) removeRow(rowId)
    })
  }

  return {
    editableMeta: {
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
      removeSelectedRows: handleRemoveSelectedRows
    }
  }
}
