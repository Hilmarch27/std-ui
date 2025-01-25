import { ColumnDef } from "@tanstack/react-table";
import { Student } from "./types";
import { EditableColumnHeader } from "./column-header";
import { EditedCell } from "./row-action";
import { EditableCell } from "./editable-cell";
import { Checkbox } from "@/components/ui/checkbox";

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
    header: ({ column }) => <EditableColumnHeader column={column} title="No" />,
    cell: ({ row }) => <div className="w-[80px]">{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <EditableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ column, getValue, row, table }) => (
      <EditableCell
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
      <EditableColumnHeader column={column} title="Date Of Birth" />
    ),
     cell: ({ column, getValue, row, table }) => (
      <EditableCell
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
      <EditableColumnHeader column={column} title="Major" />
    ),
     cell: ({ column, getValue, row, table }) => (
      <EditableCell
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
