import { getCurrentUser } from '@/lib/session'

import { Typography } from '@/components/ui/typography'
import { ParseTesterForm } from './ParseTesterForm'

export default async function ParseTester() {
  const user = await getCurrentUser()

  //redirect to home if not logged in
  if (user?.role !== 'admin') {
    return <Typography>Please log in to create a recipe</Typography>
  }

  return (
    <>
      <Typography variant="h2">Parse Tester</Typography>
      <Typography>Test text parsing logic on any input</Typography>
      <ParseTesterForm />
    </>
  )
}
