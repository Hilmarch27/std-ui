import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/registry/blocks/data-table/block/data-table-column-header";
import { EditTableCell } from "@/registry/blocks/data-table/block/edit-table-cell";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@prisma/client";
import { EditedCell } from "@/registry/blocks/data-table/block/edit-table-row-action";

export const COLUMNS_USERS: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
    enableHiding: false,
  },
  {
    accessorKey: "no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ column, getValue, row, table }) => (
      <EditTableCell
        column={column}
        getValue={getValue}
        row={row}
        table={table}
      />
    ),
    meta: {
      type: "text",
      required: true,
      validationMessage: "Name is required",
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ column, getValue, row, table }) => (
      <EditTableCell
        column={column}
        getValue={getValue}
        row={row}
        table={table}
      />
    ),
    meta: {
      type: "text",
      required: true,
      validationMessage: "Email is required",
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ column, getValue, row, table }) => (
      <EditTableCell
        column={column}
        getValue={getValue}
        row={row}
        table={table}
      />
    ),
    meta: {
      type: "text",
      required: true,
      validationMessage: "Phone is required",
    },
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Avatar" />
    ),
    cell: ({ column, getValue, row, table }) => (
      <EditTableCell
        column={column}
        getValue={getValue}
        row={row}
        table={table}
      />
    ),
    meta: {
      type: "text",
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => (
      <EditedCell title={row.getValue("name")} row={row} table={table} />
    ),
  },
];
