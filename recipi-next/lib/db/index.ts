import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema-pg'

console.log(process.env.DATABASE_URL)
const connection = neon(process.env.DATABASE_URL!)

// @ts-ignore
export const db = drizzle(connection, { schema })
