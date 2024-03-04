'use client'

import { useState } from 'react'
import { useCurrentUser } from '@/hooks/use-current-user'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { Textarea } from '@/components/ui/textarea'
import { RatingStars } from './RatingStars'

interface AddReviewProps {
  recipeId: string
}

export const AddReview = ({ recipeId }: AddReviewProps) => {
  const user = useCurrentUser()
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')

  return (
    <div className="flex flex-row items-end gap-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-row items-center justify-between gap-4">
          <Typography variant="h4">Add a review</Typography>
          <RatingStars setRating={setRating} />
        </div>

        <div className="flex grow flex-row items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={user?.image || undefined}
              alt={user?.name || "User's profile image"}
              className=""
            />
            <AvatarFallback>
              {user?.name ? user?.name[0].toUpperCase() : 'ME'}
            </AvatarFallback>
          </Avatar>
          <Textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
            rows={4}
          />
        </div>
      </div>
      <Button>Post</Button>
    </div>
  )
}
