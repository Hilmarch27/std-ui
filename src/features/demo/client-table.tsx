'use client'

import { api } from '@/trpc/react'
import { Role, User } from '@prisma/client'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { COLUMNS_USERS_CLIENT } from './client-columns'
import { DataTable } from '@/registry/blocks/data-table/components/data-table'
import { ClientTableToolbar } from '@/registry/blocks/data-table/components/client-table-toolbar'
import { Button } from '@/components/ui/button'
import { UserRoundPlus } from 'lucide-react'
import { useClientTable } from '@/registry/blocks/data-table/hooks/use-client-table'

export function ClientTable() {
  const utils = api.useUtils()
  const [data, setData] = useState<User[]>([])

  const { data: originalData, isLoading } = api.users.getManyClientUsers.useQuery()

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

  useEffect(() => {
    if (!isLoading && originalData?.result) {
      setData(originalData.result)
    }
  }, [isLoading, originalData])

  const columns = useMemo(() => {
    return COLUMNS_USERS_CLIENT()
  }, [])

  const { table } = useClientTable({
    initialState: {
      columnPinning: {
        right: ['actions']
      }
    },
    defaultColumn: {
      minSize: 150
    },
    data: data ?? [],
    columns,
    getRowId: (originalRow) => originalRow.id, // this is required for overide id
    setData,
    isEditable: true,
    originalData: originalData?.result ?? [],
    fieldRow: {
      id: 'create',
      name: '',
      email: '',
      role: 'guest' as Role,
      phone: '',
      image: '',
      createdAt: new Date()
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
        <ClientTableToolbar table={table}>
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
        </ClientTableToolbar>
      </DataTable>
    </div>
  )
}
