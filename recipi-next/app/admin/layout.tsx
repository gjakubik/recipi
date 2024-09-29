import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import Script from 'next/script'

import { MainNav } from '@/components/MainNav'
import Footer from '@/components/Footer'
import { adminNavConfig } from '@/config/admin'

export default async function CreateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  if (!user) return redirect('/')
  return (
    <>
      <Script
        src="https://app.lemonsqueezy.com/js/lemon.js"
        strategy="beforeInteractive"
      />
      <div className="flex h-screen flex-col">
        <MainNav config={adminNavConfig} />
        <div className="container mx-auto flex flex-col space-y-4 py-12 lg:max-w-[1200px]">
          {children}
        </div>
        <Footer />
      </div>
    </>
  )
}
