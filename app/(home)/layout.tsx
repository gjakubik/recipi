import { getCurrentUser } from '@/lib/session'
import { MainNav } from '@/components/MainNav'
import { Container } from '@/components/ui/container'

export default async function CreateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  return (
    <div className="flex flex-col h-screen">
      <MainNav user={user} />
      <div className="container mx-auto lg:max-w-[1200px] py-12">
        {children}
      </div>
    </div>
  )
}
