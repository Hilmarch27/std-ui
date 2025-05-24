import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/registry/blocks/data-table/components/data-table-column-header'
import { EditTableCell } from '@/registry/blocks/data-table/components/edit-table-cell'
import { Checkbox } from '@/components/ui/checkbox'
import { Role, User } from '@prisma/client'
import { EditedCell } from '@/registry/blocks/data-table/components/edit-table-row-action'
import { z } from 'zod'
import { CalendarIcon, Text, User as Guest, UserCog, UserCheck, CircleDashed } from 'lucide-react'

export function getRoleIcon(status: User['role']) {
  const statusIcons = {
    guest: Guest,
    admin: UserCog,
    user: UserCheck
  }

  return statusIcons[status] || Guest
}

type ColumnUsersProps = {
  roleCount: Record<User['role'], number>
}

export function COLUMNS_USERS({ roleCount }: ColumnUsersProps): ColumnDef<User>[] {
  return [
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
      minSize: 30,
      maxSize: 30,
      enableResizing: false,
      enablePinning: false,
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'no',
      header: ({ column }) => <DataTableColumnHeader column={column} title="No" />,
      cell: ({ row }) => <div>{row.index + 1}</div>,
      minSize: 40,
      maxSize: 40,
      enableSorting: false,
      enablePinning: false,
      enableHiding: false
    },
    {
      id: 'name',
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Full Name" />,
      cell: ({ column, getValue, row, table }) => (
        <EditTableCell column={column} getValue={getValue} row={row} table={table} />
      ),
      meta: {
        label: 'Name',
        placeholder: 'Search Name...',
        variant: 'text',
        icon: Text,
        schema: z
          .string()
          .min(1, 'minumum 1')
          .regex(/^[^0-9]*$/, 'Name must not contain numbers')
      },
      enableColumnFilter: true
    },
    {
      accessorKey: 'email',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
      cell: ({ column, getValue, row, table }) => (
        <EditTableCell column={column} getValue={getValue} row={row} table={table} />
      ),
      meta: {
        variant: 'text',
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
        variant: 'text'
      }
    },
    {
      id: 'role',
      accessorKey: 'role',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Roles" />,
      cell: ({ cell, getValue, row, table, column }) => {
        const role = Object.values(Role).find((role) => role === cell.getValue<User['role']>())
        if (!role) return null

        const Icon = getRoleIcon(role)

        return <EditTableCell icon={Icon} column={column} getValue={getValue} row={row} table={table} />
      },
      meta: {
        label: 'Roles',
        variant: 'multiSelect',
        options: Object.values(Role).map((role) => ({
          label: role.charAt(0).toUpperCase() + role.slice(1),
          value: role,
          count: roleCount[role],
          icon: getRoleIcon(role)
        })),
        icon: CircleDashed
      },
      enableColumnFilter: true
    },
    {
      accessorKey: 'image',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Avatar" />,
      cell: ({ column, getValue, row, table }) => (
        <EditTableCell column={column} getValue={getValue} row={row} table={table} />
      ),
      meta: {
        variant: 'text'
      }
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
      cell: ({ row }) => <span>{String(row.getValue('createdAt'))}</span>,
      meta: {
        label: 'Created At',
        variant: 'dateRange',
        icon: CalendarIcon
      },
      enableColumnFilter: true
    },
    {
      id: 'actions',
      cell: ({ row, table }) => <EditedCell title={row.getValue('name')} row={row} table={table} />,
      minSize: 90,
      maxSize: 90,

      enableResizing: false,
      enableHiding: false
    }
  ]
}
