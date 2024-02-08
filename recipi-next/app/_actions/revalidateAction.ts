'use server'

import { revalidatePath } from 'next/cache'

export default async function serverRevalidatePath(path: string) {
  console.log('serverRevalidatePath', path)
  revalidatePath(path)
  return
}
