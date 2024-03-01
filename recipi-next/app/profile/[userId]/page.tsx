import { useRouter, redirect } from 'next/navigation'
import { getMenus, getAuthorRecipes } from '@/lib/db/api'

import { Typography } from '@/components/ui/typography'

interface ProfilePageProps {
  params: {
    userId: string
  }
}

export default function ProfilePage({ params: { userId } }: ProfilePageProps) {
  //redirect to recipes tab
  redirect(`/profile/${userId}/recipes`)

  return null
}
