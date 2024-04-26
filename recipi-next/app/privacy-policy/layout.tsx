import Footer from '@/components/Footer'
import { MainNav } from '@/components/MainNav'
import { defaultNavConfig } from '@/config/default'

export default async function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <MainNav config={defaultNavConfig} />
      <div className="container mx-auto flex flex-col space-y-4 py-12 md:w-5/6 lg:w-2/3">
        {children}
      </div>
      <Footer />
    </>
  )
}
