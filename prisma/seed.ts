import { faker } from '@faker-js/faker'
import { db } from '@/server/db'
import { UserSchema } from '@/registry/blocks/data-table/lib/schema/table'

async function main() {
  // Generate 100 fake users
  const users = Array.from({ length: 100 }, () => {
    const userData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: faker.helpers.arrayElement(['admin', 'user', 'guest']),
      phone: faker.phone.number(),
      image: faker.image.avatar()
    }

    // Validasi data dengan Zod schema
    const validatedData = UserSchema.CREATE.parse(userData)
    return validatedData
  })

  // Batch insert users
  const batchSize = 10
  for (let i = 0; i < users.length; i += batchSize) {
    const batch = users.slice(i, i + batchSize)
    await db.user.createMany({
      data: batch
    })
  }

  console.info(`Successfully seeded ${users.length} users`)
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
