import { SearchParams } from 'nuqs'
import { searchParamsCache } from '@/registry/blocks/server-table/lib/schema/table'
import { api } from '@/trpc/server'
import TABLE_USER from '@/app/_comp/table-users'

type TSearchParams = Promise<SearchParams>

export default async function ExampleDataTable(props: { searchParams: TSearchParams }) {
  const search = await props.searchParams
  const query = searchParamsCache.parse(search)
  console.log('searchParams incik boss', query)
  await api.users.getManyUsers(query)
  return <TABLE_USER query={query} />
}
