import { PropsWithChildren } from 'react'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/session'
import { defaultNavConfig } from '@/config/default'
import { getUser } from '@/lib/db/api'

import { Container } from '@/components/ui/container'
import { Typography } from '@/components/ui/typography'
import { MainNav } from '@/components/MainNav'
import { TabLink } from '@/components/TabLink'

interface ProfilePageProps extends PropsWithChildren {
  params: {
    userId: string
  }
}

export default async function ProfilePageLayout({
  params: { userId },
  children,
}: ProfilePageProps) {
  const user = await getCurrentUser()
  const profile = await getUser(userId)

  // TODO: Not found here
  if (!profile) {
    redirect('/')
  }

  const isMyProfile = user?.id === userId
  const { name, email, created_at } = profile

  return (
    <div className="h-min-screen flex flex-col">
      <MainNav config={defaultNavConfig} />
      {profile ? (
        <Container className="flex-col space-y-4 pb-8 md:w-5/6 lg:w-2/3">
          <Typography variant="h3">
            {isMyProfile ? 'My Profile' : name}
          </Typography>
          <div>
            {isMyProfile && <Typography>Name: {name}</Typography>}
            <Typography variant="pn">Email: {email}</Typography>
            <Typography variant="pn">
              Joined: {created_at?.toLocaleDateString()}
            </Typography>
          </div>

          <div className="flex flex-row items-center gap-2">
            <TabLink tabId="recipes">Recipes</TabLink>
            <TabLink tabId="menus">Menus</TabLink>
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
