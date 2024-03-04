'use client'

import { useRouter } from 'next/navigation'
import { saveRecipe, unsaveRecipe } from '@/lib/db/api'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { Bookmark, BookmarkCheck } from 'lucide-react'

interface SaveUnsaveButtonProps {
  isSaved: boolean
  recipeId: number
}

export const SaveUnsaveButton = ({
  isSaved,
  recipeId,
}: SaveUnsaveButtonProps) => {
  const router = useRouter()
  const handleSave = async () => {
    await saveRecipe({ recipeId })
    router.refresh()
  }

  const handleUnsave = async () => {
    await unsaveRecipe({ recipeId })
    router.refresh()
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={isSaved ? handleUnsave : handleSave}
          variant="ghost"
          className="px-2"
        >
          {isSaved ? <BookmarkCheck size={28} /> : <Bookmark size={28} />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {isSaved ? 'Unsave Recipe' : 'Save Recipe'}
      </TooltipContent>
    </Tooltip>
  )
}
