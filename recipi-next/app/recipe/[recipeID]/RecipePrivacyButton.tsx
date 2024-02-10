'use client'

import { useRouter } from 'next/navigation'
import { updateRecipePrivacy } from '@/lib/db/api'
import { Recipe } from '@/types'

import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { LockKeyhole, UnlockKeyhole } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface RecipePrivacyButtonProps {
  recipe: Recipe
}

export const RecipePrivacyButton = ({ recipe }: RecipePrivacyButtonProps) => {
  const router = useRouter()
  const { toast } = useToast()
  return (
    <Tooltip>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <TooltipTrigger asChild>
            <Button variant="ghost">
              {recipe.isPrivate ? <LockKeyhole /> : <UnlockKeyhole />}
            </Button>
          </TooltipTrigger>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Make Recipe {recipe.isPrivate ? 'Public' : 'Private'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to make this recipe{' '}
              {recipe.isPrivate ? 'public' : 'private'}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                try {
                  updateRecipePrivacy(recipe.id, !recipe.isPrivate)
                } catch {
                  toast({
                    title: 'Error',
                    description:
                      'There was an error updating the recipe privacy',
                    variant: 'destructive',
                  })
                }
                router.refresh()
              }}
            >
              {recipe.isPrivate ? 'Make Public' : 'Make Private'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
        <TooltipContent>
          {recipe.isPrivate
            ? 'This recipe is private. Click to make it public.'
            : 'This recipe is public. Click to make it private.'}
        </TooltipContent>
      </AlertDialog>
    </Tooltip>
  )
}
