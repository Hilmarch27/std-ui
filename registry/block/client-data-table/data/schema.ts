import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  email: z.string(),
});

export type TUser = z.infer<typeof userSchema>;
