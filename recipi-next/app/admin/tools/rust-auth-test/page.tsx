import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { getCurrentUser, getSessionToken } from '@/lib/session'
import RequestButton from './RequestButton'

export default async function RustAuthTest() {
  const user = await getCurrentUser()
  if (!user) return null
  const sessionToken = await getSessionToken(user.id)

  return (
    <div>
      <Typography variant="h1">Rust Auth Test</Typography>
      <Typography variant="p">User: {user.name}</Typography>
      <Typography variant="pn">Email: {user.email}</Typography>
      <Typography variant="pn">Role: {user.role}</Typography>
      <Typography variant="pn">Session Token: {sessionToken}</Typography>
      <RequestButton sessionToken={sessionToken} />
    </div>
  )
}
