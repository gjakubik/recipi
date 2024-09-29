'use client'

import { useRouter } from 'next/navigation'
import { deletePlans } from '@/lib/db/api'
import { Button } from '@/components/ui/button'

export const SyncPlansButton = () => {
  const router = useRouter()

  const handleClick = async () => {
    await deletePlans()
    router.refresh()
  }
  return <Button onClick={handleClick}>Sync Plans</Button>
}
