'use client'

import { useRouter } from 'next/navigation'
import { deleteRecipe } from '@/lib/db/api'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

interface DeleteRecipeButtonProps {
  recipeId: number
}

export const DeleteRecipeButton = ({ recipeId }: DeleteRecipeButtonProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const handleDelete = async () => {
    try {
      await deleteRecipe(recipeId)
      toast({
        title: 'Success',
        description: 'Recipe deleted',
      })
      router.push('/')
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  return (
    <AlertDialog>
      <Button variant="destructive" asChild>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            recipe.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
