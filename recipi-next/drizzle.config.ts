import type { Config } from 'drizzle-kit'
import 'dotenv/config'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required.')
}

const config: Config = {
  schema: './lib/db/schema-pg.ts',
  out: './lib/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
}

export default config
