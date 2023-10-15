import { MainNav } from '@/components/MainNav'
import { Container } from '@/components/ui/container'

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-screen">
      <MainNav />
      <Container className="lg:w-2/3 flex-col space-y-4 pb-8">
        {children}
      </Container>
    </div>
  )
}
