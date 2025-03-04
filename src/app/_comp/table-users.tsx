"use client";
import { useDataTable } from "@/registry/blocks/data-table/hooks/use-data-table";
import { api } from "@/trpc/react";
import React from "react";
import { COLUMNS_USERS as columns } from "./columns-users";
import { DataTable } from "@/registry/blocks/data-table/block/data-table";
import { DataTableToolbar } from "@/registry/blocks/data-table/block/data-table-toolbar";
import { toast } from "sonner";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import { keepPreviousData } from "@tanstack/react-query";

function TABLE_USER() {
  const [data, setData] = React.useState<User[]>([]);
  const { data: originalData, isLoading } = api.users.getManyUsers.useQuery(
    {},
    { placeholderData: keepPreviousData }
  );

  const utils = api.useUtils();

  const create = api.users.create.useMutation({
    onSuccess: async () => {
      await utils.users.invalidate();
      toast.success("User created");
    },
  });

  const update = api.users.update.useMutation({
    onSuccess: async () => {
      await utils.users.invalidate();
      toast.success("User updated");
    },
  });

  const remove = api.users.delete.useMutation({
    onSuccess: async () => {
      await utils.users.invalidate();
      toast.success("User deleted");
    },
  });

  React.useEffect(() => {
    if (!isLoading && originalData?.result) {
      setData(originalData.result);
    }
  }, [isLoading, originalData]);

  const { table } = useDataTable({
    data: data ?? [],
    pageCount: originalData?.rowCount ?? 0,
    columns,
    originalData: originalData?.result ?? [],
    setData,
    createEmptyRow() {
      return {
        id: "",
        name: "",
        email: "",
        phone: "",
        image: "",
        created_at: new Date(),
        updated_at: new Date(),
      };
    },
    createRow(payload) {
      create.mutate(payload);
    },
    removeRow(id) {
      remove.mutateAsync({ id });
    },
    updateRow(id, payload) {
      update.mutateAsync({ ...payload, id });
    },
  });

  return (
    <>
      TABLE_USER
      <DataTable table={table}>
        <DataTableToolbar table={table}>
          <Button
            disabled={!!table.options.meta?.pendingCreate}
            onClick={table.options.meta?.createRow}
            variant="outline"
            size="sm"
            className="h-8"
          >
            Create New
            <UserRoundPlus className="ml-2 h-4 w-4" />
          </Button>
        </DataTableToolbar>
      </DataTable>
    </>
  );
}

export default TABLE_USER;
