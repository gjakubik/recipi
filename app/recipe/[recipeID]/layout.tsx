import { MainNav } from '@/components/MainNav'
import { Container } from '@/components/ui/container'
import { getCurrentUser } from '@/lib/session'

export default async function RecipePageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  return (
    <div className="flex flex-col h-min-screen">
      <MainNav user={user} />
      <Container className="md:w-5/6 lg:w-2/3 flex-col space-y-4 pb-8">
        {children}
      </Container>
    </div>
  )
}
