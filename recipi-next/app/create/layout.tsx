import { Container } from '@/components/ui/container'
import { MainNav } from '@/components/MainNav'
import { defaultNavConfig } from '@/config/default'

export default async function CreateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col">
      <MainNav config={defaultNavConfig} />
      <Container className="flex-col space-y-4 pb-8 md:w-5/6 lg:w-2/3">
        {children}
      </Container>
    </div>
  )
}
