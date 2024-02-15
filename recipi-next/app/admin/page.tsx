import { getCurrentUser } from '@/lib/session'

import { Typography } from '@/components/ui/typography'

export default async function AdminPage() {
  const user = await getCurrentUser()

  // unneeded, middlware does this now
  // if (user?.role !== 'admin') {
  //   return <Typography>Please log in to see admin console</Typography>
  // }

  return (
    <>
      <Typography variant="h2">Admin Console</Typography>
    </>
  )
}
