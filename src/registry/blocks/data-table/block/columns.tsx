import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/registry/blocks/data-table/block/data-table-column-header";
import { EditedCell } from "./edit-table-row-action";
import { EditTableCell } from "@/registry/blocks/data-table/block/edit-table-cell";
import { Checkbox } from "@/components/ui/checkbox";
import { Student } from "@/registry/blocks/data-table/hooks/use-querry";

export const columns: ColumnDef<Student>[] = [
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="No" />,
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
    accessorKey: "dateOfBirth",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Of Birth" />
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
      type: "date",
      required: true,
      validationMessage: "Invalid date format (YYYY-MM-DD)",
    },
  },
  {
    accessorKey: "major",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Major" />
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
      type: "select",
      options: [
        { value: "Computer Science", label: "Computer Science" },
        { value: "Communications", label: "Communications" },
        { value: "Business", label: "Business" },
        { value: "Psychology", label: "Psychology" },
      ],
      required: true,
      validationMessage: "Major is required",
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => (
      <EditedCell title={row.getValue("name")} row={row} table={table} />
    ),
  },
];
