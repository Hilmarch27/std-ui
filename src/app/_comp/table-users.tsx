'use client'
import { useDataTable } from '@/registry/blocks/server-table/hooks/use-data-table'
import { api } from '@/trpc/react'
import React from 'react'
import { COLUMNS_USERS } from './columns-users'
import { DataTable } from '@/registry/blocks/server-table/components/data-table'
import { DataTableToolbar } from '@/registry/blocks/server-table/components/data-table-toolbar'
import { toast } from 'sonner'
import { Role, User } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { UserRoundPlus } from 'lucide-react'
import { keepPreviousData } from '@tanstack/react-query'
import { QuerySchema } from '@/registry/blocks/server-table/lib/schema/table'

function TABLE_USER({ query }: { query?: QuerySchema }) {
  const [data, setData] = React.useState<User[]>([])
  const { data: originalData, isLoading } = api.users.getManyUsers.useQuery(
    { ...query },
    { placeholderData: keepPreviousData }
  )

  const [roleCount] = api.users.getRoleCounts.useSuspenseQuery()

  const utils = api.useUtils()

  const create = api.users.create.useMutation({
    onSuccess: async () => {
      await utils.users.invalidate()
      toast.success('User created')
    }
  })

  const update = api.users.update.useMutation({
    onSuccess: async () => {
      await utils.users.invalidate()
      toast.success('User updated')
    }
  })

  const remove = api.users.delete.useMutation({
    onSuccess: async () => {
      await utils.users.invalidate()
      toast.success('User deleted')
    }
  })

  React.useEffect(() => {
    if (!isLoading && originalData?.result) {
      setData(originalData.result)
    }
  }, [isLoading, originalData])

  const columns = React.useMemo(() => {
    return COLUMNS_USERS({
      roleCount: roleCount
    })
  }, [roleCount])

  // ? useDataTable
  const { table } = useDataTable({
    initialState: {
      columnPinning: {
        right: ['actions']
      },
      sorting: [{ id: 'name', desc: true }]
    },
    defaultColumn: {
      minSize: 150
    },
    data: data ?? [],
    pageCount: originalData?.pageCount ?? -1,
    columns,
    originalData: originalData?.result ?? [],
    getRowId: (originalRow) => originalRow.id, // this is required for overide id
    setData,
    createEmptyRow() {
      return {
        id: 'create',
        name: '',
        email: '',
        role: 'guest' as Role,
        phone: '',
        image: '',
        createdAt: new Date(),
      }
    },
    createRow(payload) {
      create.mutate(payload)
    },
    removeRow(id) {
      remove.mutateAsync({ id })
    },
    updateRow(id, payload) {
      update.mutateAsync({ ...payload, id })
    }
  })

  return (
    <div className="w-full">
      <DataTable className="min-h-[570px] py-3" table={table}>
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
    </div>
  )
}

export default TABLE_USER
