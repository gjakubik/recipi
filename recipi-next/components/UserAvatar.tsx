import { User } from '@/types'
import Link from 'next/link'
import { cn, getInitials } from '@/lib/utils'

import { Typography } from '@/components/ui/typography'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface UserAvatarProps {
  user: User
  withLink?: boolean
  className?: string
}

export const UserAvatar = ({ user, withLink, className }: UserAvatarProps) => {
  return (
    <div className={cn('flex flex-row items-center gap-2', className)}>
      <Avatar className="h-[30px] w-[30px]">
        <AvatarImage
          src={user.image ? user.image : undefined}
          alt={user.name!}
        />
        <AvatarFallback>{getInitials(user.name!)}</AvatarFallback>
      </Avatar>
      {withLink ? (
        <Link href={`/profile/${user.id}`}>
          <Typography variant="light" className="hover:underline">
            {user.name}
          </Typography>
        </Link>
      ) : (
        <Typography variant="light">{user.name}</Typography>
      )}
    </div>
  )
}
