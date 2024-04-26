'use client'

import { PropsWithChildren, useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteReview } from '@/lib/db/api'
import { useToast } from '@/components/ui/use-toast'
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogContent,
} from '@/components/ui/alert-dialog'

interface DeleteReviewConfirmationProps extends PropsWithChildren {
  reviewId: number
}
// Wrap this around a button to turn it into a delete confirmation dialog
export const DeleteReviewConfirmation = ({
  reviewId,
  children,
}: DeleteReviewConfirmationProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (isDeleting) return
    setIsDeleting(true)
    try {
      await deleteReview(reviewId)
      toast({
        title: 'Review deleted',
        description: 'Your review has been deleted successfully',
      })
    } catch {
      toast({
        title: 'Error deleting review',
        description: 'Please try again later or contact support',
      })
    }

    setIsDeleting(false)
    router.refresh()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Review</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this review?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isDeleting} onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
