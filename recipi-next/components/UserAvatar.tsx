import { User } from '@/types'
import Link from 'next/link'
import { cn, getInitials } from '@/lib/utils'

import { Typography } from '@/components/ui/typography'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface UserAvatarProps {
  user: User
  className?: string
}

export const UserAvatar = ({ user, className }: UserAvatarProps) => {
  return (
    <div className={cn('flex flex-row items-center gap-2', className)}>
      <Avatar className="h-[30px] w-[30px]">
        <AvatarImage
          src={user.image ? user.image : undefined}
          alt={user.name!}
        />
        <AvatarFallback>{getInitials(user.name!)}</AvatarFallback>
      </Avatar>
      <Typography variant="light">{user.name}</Typography>
    </div>
  )
}
