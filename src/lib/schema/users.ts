import { z, ZodType } from "zod";

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
  pageIndex: z.number().default(0),
  pageSize: z.number().max(50).default(10),
});
