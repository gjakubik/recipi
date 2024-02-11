/*
 * This file is not used, we use npm run db:push to put it in dev DB and use the planetscale console to push it to prod
 * We are keeping it in case we want to customize/automate our flow more in the future.
 * An idea would be to check for the latest migration, and if there is a column alteraton, we can run some arbitrary script we have to pull down the old data, modify it, and them push up the changes after the migration has been applied.
 * This would require more orchestration in terms of backing up the data and then having a safe failure state. This also would give us some data downtime, whereas our current system of doing alteratoins as a two step add and delete is zero downtime.
 */

import { migrate } from 'drizzle-orm/planetscale-serverless/migrator'
import { connect } from '@planetscale/database'
import { drizzle } from 'drizzle-orm/planetscale-serverless'

import { fetch } from 'undici'

import 'dotenv/config'

// inspired by Raphael Moreau @rphlmr for Postgres, extended for Planetscale
const runMigrate = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined')
  }

  const connection = connect({
    url: process.env.DATABASE_URL,
    fetch,
  })

  // @ts-ignore
  const db = drizzle(connection)

  console.log('⏳ Running migrations...')

  const start = Date.now()

  await migrate(db, { migrationsFolder: 'src/lib/db/migrations' })

  const end = Date.now()

  console.log(`✅ Migrations completed in ${end - start}ms`)

  process.exit(0)
}

runMigrate().catch((err) => {
  console.error('❌ Migration failed')
  console.error(err)
  process.exit(1)
})
