import { getCurrentUser } from '@/lib/session'

import { Container } from '@/components/ui/container'
import { MainNav } from '@/components/MainNav'
import { defaultNavConfig } from '@/config/default'

export default async function MenuPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  return (
    <div className="flex flex-col h-min-screen">
      <MainNav user={user} config={defaultNavConfig} />
      <Container className="md:w-5/6 lg:w-2/3 flex-col space-y-4 pb-8">
        {children}
      </Container>
    </div>
  )
}
