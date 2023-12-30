import { getCurrentUser } from '@/lib/session'

import { Typography } from '@/components/ui/typography'

export default async function CreateRecipePage() {
  const user = await getCurrentUser()

  //redirect to home if not logged in
  if (user?.role !== 'admin') {
    return <Typography>Please log in to see admin console</Typography>
  }

  return (
    <>
      <Typography variant="h2">Admin Console</Typography>
    </>
  )
}
