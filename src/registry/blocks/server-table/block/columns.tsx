import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/registry/blocks/server-table/block/data-table-column-header'
import { EditedCell } from './edit-table-row-action'
import { EditTableCell } from '@/registry/blocks/server-table/block/edit-table-cell'
import { Checkbox } from '@/components/ui/checkbox'
import { Student } from '@/registry/blocks/server-table/hooks/use-querry'
import { z } from 'zod'

/**
 * Mengatur ukuran kolom tabel dengan TanStack Table.
 *
 * @see https://tanstack.com/table/latest/docs/guide/column-sizing
 */

export const columns: ColumnDef<Student>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'no',
    header: ({ column }) => <DataTableColumnHeader column={column} title="No" />,
    cell: ({ row }) => <div className="w-[80px]">{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Full Name" />,
    cell: ({ column, getValue, row, table }) => (
      <EditTableCell column={column} getValue={getValue} row={row} table={table} />
    ),
    meta: {
      variant: 'text',
      schema: z.string().min(1, { message: 'Name is required boss' })
    }
  },
  {
    accessorKey: 'dateOfBirth',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date Of Birth" />,
    cell: ({ column, getValue, row, table }) => (
      <EditTableCell column={column} getValue={getValue} row={row} table={table} />
    ),
    meta: {
      variant: 'date'
    }
  },
  {
    accessorKey: 'major',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Major" />,
    cell: ({ column, getValue, row, table }) => (
      <EditTableCell column={column} getValue={getValue} row={row} table={table} />
    ),
    meta: {
      variant: 'select',
      options: [
        { value: 'Computer Science', label: 'Computer Science' },
        { value: 'Communications', label: 'Communications' },
        { value: 'Business', label: 'Business' },
        { value: 'Psychology', label: 'Psychology' }
      ]
    }
  },
  {
    id: 'actions',
    cell: ({ row, table }) => <EditedCell title={row.getValue('name')} row={row} table={table} />
  }
]
