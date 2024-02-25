import { PropsWithChildren } from 'react'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/session'
import { defaultNavConfig } from '@/config/default'
import { getUser } from '@/lib/db/api'

import { Container } from '@/components/ui/container'
import { Typography } from '@/components/ui/typography'
import { MainNav } from '@/components/MainNav'
import Link from 'next/link'

interface ProfilePageProps extends PropsWithChildren {
  params: {
    userId: string
  }
}

export default async function ProfilePageLayout({
  params: { userId },
  children,
}: ProfilePageProps) {
  const profile = await getUser(userId)

  return (
    <div className="h-min-screen flex flex-col">
      <MainNav config={defaultNavConfig} />
      {profile ? (
        <Container className="flex-col space-y-4 pb-8 md:w-5/6 lg:w-2/3">
          <Typography variant="h2">{profile.name}</Typography>

          <div className="flex flex-row items-center gap-2">
            <Link
              className="dashed-border-hover px-4 pb-3"
              href={`/profile/${userId}/recipes`}
            >
              Recipes
            </Link>
            <Link
              className="dashed-border-hover px-4 pb-3"
              href={`/profile/${userId}/menus`}
            >
              Menus
            </Link>
          </div>
          {children}
        </Container>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Typography variant="h3">No Profile Found</Typography>
        </div>
      )}
    </div>
  )
}
