import { SearchParams } from 'nuqs'
import { searchParamsCache } from '@/registry/blocks/server-table/lib/schema/table'
import TABLE_USER from '../_comp/table-users'
import { api } from '@/trpc/server'

type TSearchParams = Promise<SearchParams>

export default async function Example(props: { searchParams: TSearchParams }) {
  const search = await props.searchParams
  const query = searchParamsCache.parse(search)
  console.log('searchParams incik boss', query)
  await api.users.getManyUsers(query)
  return (
    <main className="px-8  flex min-h-screen flex-col items-center justify-center bg-background">
      <TABLE_USER query={query} />
    </main>
  )
}
