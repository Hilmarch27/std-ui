import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { searchParams, UserSchema } from '@/registry/blocks/server-table/lib/schema/table'
import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const userRouter = createTRPCRouter({
  getManyUsers: publicProcedure.input(searchParams).query(async ({ ctx, input }) => {
    const { page, perPage, sort, ...filters } = input

    // Tentukan kondisi filter untuk pencarian
    const where: Prisma.UserWhereInput = {
      ...(filters.createdAt?.length === 2 && {
        createdAt: {
          ...(filters.createdAt[0] && {
            gte: (() => {
              const from = new Date(filters.createdAt[0])
              from.setHours(0, 0, 0, 0)
              return from
            })()
          }),
          ...(filters.createdAt[1] && {
            lte: (() => {
              const to = new Date(filters.createdAt[1])
              to.setHours(23, 59, 59, 999)
              return to
            })()
          })
        }
      }),
      ...(filters.name && {
        name: {
          contains: filters.name,
          mode: 'insensitive' // supaya tidak case-sensitive
        }
      })
    }

    let orderBy = {}

    if (sort) {
      const [field, direction] = sort.split('.')
      if (!field || !direction) return
      // Pastikan field valid untuk menghindari SQL injection
      const validFields = ['name', 'email', 'phone', 'createdAt', 'updatedAt'] // sesuaikan dengan model Anda

      if (validFields.includes(field) && ['asc', 'desc'].includes(direction)) {
        orderBy = {
          [field]: direction
        }
      }
    }

    const skip = (page - 1) * perPage
    const [users, count] = await Promise.all([
      ctx.db.user.findMany({
        where,
        orderBy,
        skip: skip,
        take: perPage
      }),
      ctx.db.user.count({
        where // Gunakan filter yang sama untuk mendapatkan jumlah total yang sesuai
      })
    ])

    return {
      result: users ?? [],
      pageCount: Math.ceil(count / perPage)
    }
  }),

  create: publicProcedure.input(UserSchema.CREATE).mutation(async ({ ctx, input }) => {
    return ctx.db.user.create({
      data: input
    })
  }),

  update: publicProcedure.input(UserSchema.UPDATE).mutation(async ({ ctx, input }) => {
    const { id, ...data } = input // Pisahkan id agar tidak ikut di-update
    return ctx.db.user.update({
      where: { id }, // Gunakan id untuk menentukan user yang diupdate
      data // Data yang akan diupdate
    })
  }),

  delete: publicProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    return ctx.db.user.delete({
      where: {
        id: input.id
      }
    })
  })
})
