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
      <div className="container mx-auto py-12 lg:max-w-[1200px]">
        {children}
      </div>
    </div>
  )
}
