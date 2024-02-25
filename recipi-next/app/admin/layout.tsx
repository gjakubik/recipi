import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'

import { Container } from '@/components/ui/container'
import { MainNav } from '@/components/MainNav'
import { adminNavConfig } from '@/config/admin'

export default async function CreateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  if (!user) return redirect('/')
  return (
    <div className="flex h-screen flex-col">
      <MainNav config={adminNavConfig} />
      <Container className="flex-col space-y-4 pb-8 md:w-5/6 lg:w-2/3">
        {children}
      </Container>
    </div>
  )
}
