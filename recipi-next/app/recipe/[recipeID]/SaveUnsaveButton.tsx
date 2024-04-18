'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { saveRecipe, unsaveRecipe } from '@/lib/db/api'
import { useToast } from '@/components/ui/use-toast'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { Typography } from '@/components/ui/typography'

interface SaveUnsaveButtonProps {
  isSaved: boolean
  recipeId: number
}

export const SaveUnsaveButton = ({
  isSaved,
  recipeId,
}: SaveUnsaveButtonProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    if (loading) return
    setLoading(true)
    try {
      await saveRecipe({ recipeId })
      toast({
        title: 'Recipe saved',
        description: (
          <Typography variant="light">
            Find it in your <Link href="/saved-recipes">Saved Recipes</Link>
          </Typography>
        ),
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error saving recipe',
        description: 'Please try again later',
      })
    }
    setLoading(false)
    router.refresh()
  }

  const handleUnsave = async () => {
    if (loading) return
    setLoading(true)
    try {
      await unsaveRecipe({ recipeId })
      toast({
        title: 'Recipe unsaved',
        description: 'You can always save it again later',
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error unsaving recipe',
        description: 'Please try again later',
      })
    }
    setLoading(false)
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
