import {
  createSearchParamsCache,
  parseAsInteger,
} from "nuqs/server";
import { z, ZodType } from "zod";

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
});

export type QuerySchema = Awaited<ReturnType<typeof searchParamsCache.parse>>;


export class UserSchema {
  static readonly CREATE: ZodType = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    image: z.string(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.string(),
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    image: z.string().optional(),
  });
}

export const searchParams = z.object({
  page: z.number().default(1),
  perPage: z.number().max(50).default(10),
});
