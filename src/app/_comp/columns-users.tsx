import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/registry/blocks/server-table/block/data-table-column-header'
import { EditTableCell } from '@/registry/blocks/server-table/block/edit-table-cell'
import { Checkbox } from '@/components/ui/checkbox'
import { User } from '@prisma/client'
import { EditedCell } from '@/registry/blocks/server-table/block/edit-table-row-action'
import { z } from 'zod'

export const COLUMNS_USERS: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px] mb-2"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px] mb-2"
      />
    ),
    size: 0,
    enableResizing: false,
    enablePinning: false,
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'no',
    header: ({ column }) => <DataTableColumnHeader column={column} title="No" />,
    cell: ({ row }) => <div className="w-[80px]">{row.index + 1}</div>,
    size: 0,
    enableResizing: false,
    enableSorting: false,
    enablePinning: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Full Name" />,
    cell: ({ column, getValue, row, table }) => (
      <EditTableCell column={column} getValue={getValue} row={row} table={table} />
    ),
    meta: {
      type: 'text',
      schema: z
        .string()
        .min(1, 'minumum 1')
        .regex(/^[^0-9]*$/, 'Name must not contain numbers')
    }
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ column, getValue, row, table }) => (
      <EditTableCell column={column} getValue={getValue} row={row} table={table} />
    ),
    meta: {
      type: 'text',
      schema: z.string().email('Invalid email address')
    }
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Phone" />,
    cell: ({ column, getValue, row, table }) => (
      <EditTableCell column={column} getValue={getValue} row={row} table={table} />
    ),
    meta: {
      type: 'text'
    }
  },
  {
    accessorKey: 'image',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Avatar" />,
    cell: ({ column, getValue, row, table }) => (
      <EditTableCell column={column} getValue={getValue} row={row} table={table} />
    ),
    meta: {
      type: 'text'
    }
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
    cell: ({ row }) => <span>{String(row.getValue('createdAt'))}</span>
  },
  {
    id: 'actions',
    cell: ({ row, table }) => <EditedCell title={row.getValue('name')} row={row} table={table} />,
    size: 40,
    enableResizing: false,
    enableHiding: false
  }
]
