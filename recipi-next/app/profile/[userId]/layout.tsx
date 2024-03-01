import { PropsWithChildren } from 'react'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/session'
import { defaultNavConfig } from '@/config/default'
import { getUser } from '@/lib/db/api'

import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { MainNav } from '@/components/MainNav'
import { TabLink } from '@/components/TabLink'
import { Mail, Calendar, Camera } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { EditProfileImage } from '../EditProfileImage'

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
  const { name, email, created_at, image } = profile

  return (
    <div className="h-min-screen flex flex-col">
      <MainNav config={defaultNavConfig} />
      {profile ? (
        <Container className="flex-col space-y-4 pb-8 md:w-5/6 lg:w-2/3">
          <div className="flex flex-row justify-start gap-6">
            <EditProfileImage image={image} name={name} />
            <div>
              <Typography variant="h3">
                {isMyProfile ? 'My Profile' : name}
              </Typography>
              {isMyProfile && <Typography>Name: {name}</Typography>}
              <Typography
                variant="pn"
                className="flex flex-row items-center gap-2"
              >
                <Mail className="h-5 w-5" /> {email}
              </Typography>
              <Typography
                variant="pn"
                className="flex flex-row items-center gap-2"
              >
                <Calendar className="h-5 w-5" />
                Joined {created_at?.toLocaleDateString()}
              </Typography>
            </div>
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
