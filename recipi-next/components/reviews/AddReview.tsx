'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCurrentUser } from '@/hooks/use-current-user'
import { createReview } from '@/lib/db/api'
import { useToast } from '@/components/ui/use-toast'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { Textarea } from '@/components/ui/textarea'
import { RatingStars } from '../RatingStars'
import { Icons } from '../CustomIcons'

interface AddReviewProps {
  recipeId: string
}

export const AddReview = ({ recipeId }: AddReviewProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const user = useCurrentUser()
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePost = async () => {
    if (!user) return
    if (loading) return
    setLoading(true)
    try {
      await createReview({
        recipeId,
        userId: user.id,
        rating,
        text: review,
      })
      toast({
        title: 'Review posted',
        description: 'Thank you for your feedback',
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error posting review',
        description: 'Please try again later',
      })
    }
    setLoading(false)
    router.refresh()
  }

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
      <Button onClick={handlePost} disabled={loading}>
        {loading && (
          <Icons.spinner className="h-4 w-4 animate-spin text-gray-500" />
        )}
        Post
      </Button>
    </div>
  )
}
