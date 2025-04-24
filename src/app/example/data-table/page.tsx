import { SearchParams } from 'nuqs'
import { searchParamsCache } from '@/registry/blocks/server-table/lib/schema/table'
import { api } from '@/trpc/server'
import TABLE_USER from '@/app/_comp/table-users'
import { Metadata } from 'next'
import { constructMetadata } from '@/lib/configs/metadata'
import { absoluteUrl } from '@/lib/utils'

export const metadata: Metadata = constructMetadata({
  title: 'Beautifully Designed Shadcn UI Templates',
  description:
    'Discover a collection of premium Shadcn UI templates designed to make your project shine. With modern designs and smooth functionality, these templates help you build stunning UIs with ease!',
  keywords: [
    'Shadcn UI',
    'Shadcn UI templates',
    'Tailwind CSS templates',
    'Beautiful Shadcn UI templates',
    'Beautifully designed Shadcn UI templates',
    'Beautiful Tailwind CSS templates',
    'Premium Shadcn UI templates',
    'Premium Tailwind CSS templates',
    'Free Shadcn UI templates',
    'Free Tailwind CSS templates',
    'Shadcn UI landing page templates',
    'Landing page templates',
    'Shadcn UI portfolio templates',
    'Custom Shadcn UI components',
    'STD UI',
    'Std ui components'
  ],
  alternates: {
    canonical: absoluteUrl(`/example/data-table`)
  }
})

type TSearchParams = Promise<SearchParams>

export default async function ExampleDataTable(props: { searchParams: TSearchParams }) {
  const search = await props.searchParams
  const query = searchParamsCache.parse(search)
  console.info('searchParams incik boss', query)
  await api.users.getManyUsers(query)
  return <TABLE_USER query={query} />
}
