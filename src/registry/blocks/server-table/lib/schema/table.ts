import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString } from 'nuqs/server'
import { z, ZodType } from 'zod'
import { stateToSortBy } from '../table-utils'

export const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  search: parseAsString.withDefault(''),
  sort: parseAsString.withDefault(stateToSortBy([{ id: 'name', desc: true }])!),
  createdAt: parseAsArrayOf(z.coerce.number()).withDefault([]),
})

export type QuerySchema = Awaited<ReturnType<typeof searchParamsCache.parse>>

export class UserSchema {
  static readonly CREATE: ZodType = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    image: z.string()
  })

  static readonly UPDATE: ZodType = z.object({
    id: z.string(),
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    image: z.string().optional()
  })
}

export const searchParams = z.object({
  page: z.number().default(1),
  perPage: z.number().max(50).default(10),
  search: z.string().optional(),
  sort: z.string().optional(),
  createdAt: z.array(z.coerce.number()).default([])
})