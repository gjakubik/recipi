import { User } from '@/types'
import { cn, getInitials } from '@/lib/utils'

import { Typography } from '@/components/ui/typography'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface UserAvatarProps {
  user: User
  className?: string
}

export const UserAvatar = ({ user, className }: UserAvatarProps) => {
  return (
    <div className={cn('flex flex-row gap-2 items-center', className)}>
      <Avatar className="w-[30px] h-[30px]">
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
