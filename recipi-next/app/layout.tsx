import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryProvider } from '@/providers/QueryProvider'
import { getFeatureFlags } from '@/lib/db/api'
import { FeatureFlagProvider } from '@/providers/FeatureFlagProvider'
import { getCurrentUser } from '@/lib/session'
import { CurrentUserProvider } from '@/providers/CurrentUserProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Recipi',
  description: 'The fastet way to save and share recipes',
  openGraph: {
    title: 'Recipi',
    description: 'The fastet way to save and share recipes',
    images: [{ url: '/RecipiLogo.jpg' }],
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isDev = process.env.NODE_ENV === 'development'

  const user = await getCurrentUser()
  const featureFlags = await getFeatureFlags()

  return (
    // <html lang="en" className="h-screen">
    <html lang="en" suppressHydrationWarning className="w-full">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <TooltipProvider delayDuration={1200}>
              <CurrentUserProvider user={user}>
                <FeatureFlagProvider user={user} featureFlags={featureFlags}>
                  {children}
                </FeatureFlagProvider>
              </CurrentUserProvider>
            </TooltipProvider>
            <Toaster />
            {!isDev && <Analytics />}
            {!isDev && <SpeedInsights />}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
