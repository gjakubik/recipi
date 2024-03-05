import { ReviewWithUser } from '@/types'

import { Typography } from '@/components/ui/typography'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons'

interface ReviewListProps {
  reviews: ReviewWithUser[]
}

export const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {reviews.map((review) => (
        <div key={review.id} className="flex flex-row gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={review.image || undefined}
              alt={review.name || "User Name's profile image"}
              className=""
            />
            <AvatarFallback>
              {review.name ? review.name[0] : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex flex-row items-end gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const filled = i < review.rating
                return filled ? (
                  <StarFilledIcon key={i} className="h-5 w-5" />
                ) : (
                  <StarIcon key={i} className="h-5 w-5" />
                )
              })}
              <Typography variant="extralight" className="ml-2">
                {review.rating}/5
              </Typography>
            </div>
            <Typography variant="pn">{review.text}</Typography>
            <Typography variant="light">- {review.name}</Typography>
          </div>
        </div>
      ))}
    </div>
  )
}
