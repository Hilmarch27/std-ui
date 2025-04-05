import { MouseEvent, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Pencil, Trash, X } from 'lucide-react'
import { Row, Table } from '@tanstack/react-table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

interface EditedCellProps<TData> {
  title: string
  row: Row<TData>
  table: Table<TData>
}

export function EditedCell<TData>({ row, table, title }: EditedCellProps<TData>) {
  const meta = table.options.meta
  const validRow = meta?.validRows![row.id]
  const removeRow = () => {
    meta?.removeRow!(row.index)
  }

  const disableSubmit = validRow ? Object.values(validRow)?.some((item) => !item) : false

  const handleAction = useCallback(
    (action: 'edit' | 'cancel' | 'done') => {
      meta?.setEditedRows!((old: Record<string, boolean>) => ({
        ...old,
        [row.id]: action === 'edit' ? true : false
      }))

      if (action !== 'edit') {
        if (action === 'cancel') {
          meta?.revertData!(row.index)
        } else {
          meta?.updateRow!(row.index)
        }
      }
    },
    [row.id, row.index, meta]
  )

  const setEditedRows = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const action = e.currentTarget.name as 'edit' | 'cancel' | 'done'
      handleAction(action)
    },
    [handleAction]
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        if (meta?.editedRows![row.id] && !disableSubmit) {
          handleAction('done')
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleAction, row.id, meta?.editedRows, disableSubmit])

  return meta?.editedRows![row.id] ? (
    <div className="flex items-center gap-2">
      <Button title="Cancel" size={'icon'} onClick={setEditedRows} name="cancel">
        <X size={16} />
      </Button>

      <Button
        size={'icon'}
        onClick={setEditedRows}
        name="done"
        title="Done"
        disabled={disableSubmit}
        className={disableSubmit ? 'cursor-not-allowed' : ''}
      >
        <Check size={16} />
      </Button>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Button title="Edit" size={'icon'} onClick={setEditedRows} name="edit">
        <Pencil size={16} />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger title="Delete" asChild>
          <Button size={'icon'} variant={'destructive'} name="delete">
            <Trash size={16} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Kamu yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Menghapus data <span className="font-bold">{title}</span>?.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={removeRow}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
