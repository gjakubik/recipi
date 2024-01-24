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

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Recipi',
  description: 'Simple recipe database',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // get next env info, turn off analytics if in dev mode
  const isDev = process.env.NODE_ENV === 'development'
  console.log('isDev', isDev)

  const user = await getCurrentUser()
  const featureFlags = await getFeatureFlags()

  return (
    // <html lang="en" className="h-screen">
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <TooltipProvider delayDuration={1200}>
              <FeatureFlagProvider user={user} featureFlags={featureFlags}>
                {children}
              </FeatureFlagProvider>
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
