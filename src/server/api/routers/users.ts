import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  searchParams,
  UserSchema,
} from "@/registry/blocks/data-table/lib/schema/table";
import { z } from "zod";
import { Prisma } from "@prisma/client";

export const userRouter = createTRPCRouter({
  getManyUsers: publicProcedure
    .input(searchParams)
    .query(async ({ ctx, input }) => {
      const { page, perPage, search } = input;

      // Tentukan kondisi filter untuk pencarian
      const where = search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive, // Gunakan enum QueryMode
                },
              },
              {
                email: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive, // Gunakan enum QueryMode
                },
              },
              {
                phone: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive, // Gunakan enum QueryMode
                },
              },
            ],
          }
        : {};

      const skip = (page - 1) * perPage;
      const [users, count] = await Promise.all([
        ctx.db.user.findMany({
          where,
          orderBy: {
            name: "desc",
          },
          skip: skip,
          take: perPage,
        }),
        ctx.db.user.count({
          where, // Gunakan filter yang sama untuk mendapatkan jumlah total yang sesuai
        }),
      ]);

      return {
        result: users ?? [],
        rowCount: count,
      };
    }),

  create: publicProcedure
    .input(UserSchema.CREATE)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        data: input,
      });
    }),

  update: publicProcedure
    .input(UserSchema.UPDATE)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input; // Pisahkan id agar tidak ikut di-update
      return ctx.db.user.update({
        where: { id }, // Gunakan id untuk menentukan user yang diupdate
        data, // Data yang akan diupdate
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
