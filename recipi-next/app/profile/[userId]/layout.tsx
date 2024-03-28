import { PropsWithChildren } from 'react'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/session'
import { defaultNavConfig } from '@/config/default'
import { getUser } from '@/lib/db/api'
import { getInitials } from '@/lib/utils'

import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { MainNav } from '@/components/MainNav'
import { TabLink } from '@/components/TabLink'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { EditProfileImage } from '../EditProfileImage'
import { Mail, Calendar, Camera, User } from 'lucide-react'

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
  const { name, email, createdAt, image } = profile

  return (
    <div className="h-min-screen flex flex-col">
      <MainNav config={defaultNavConfig} />
      {profile ? (
        <Container className="flex-col space-y-4 pb-8 md:w-5/6 lg:w-2/3">
          <div className="flex flex-row items-center justify-start gap-6">
            {userId === user?.id ? (
              <EditProfileImage image={image} name={name} />
            ) : (
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={image || undefined}
                  alt={name || "User Name's profile image"}
                  className=""
                />
                <AvatarFallback>
                  {name ? getInitials(name) : 'ME'}
                </AvatarFallback>
              </Avatar>
            )}
            <div>
              <Typography variant="h3">
                {isMyProfile ? 'My Profile' : name}
              </Typography>
              {isMyProfile && (
                <Typography
                  variant="pn"
                  className="flex flex-row items-center gap-2"
                >
                  <User className="h-5 w-5" /> {name}
                </Typography>
              )}
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
                Joined {createdAt?.toLocaleDateString()}
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
