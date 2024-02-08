import { getCurrentUser } from '@/lib/session'

import { Container } from '@/components/ui/container'
import { MainNav } from '@/components/MainNav'
import { adminNavConfig } from '@/config/admin'

export default async function CreateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  return (
    <div className="flex flex-col h-screen">
      <MainNav user={user} config={adminNavConfig} />
      <Container className="md:w-5/6 lg:w-2/3 flex-col space-y-4 pb-8">
        {children}
      </Container>
    </div>
  )
}
