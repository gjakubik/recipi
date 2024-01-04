import { cn } from '@/lib/utils'
import { Recipe } from '@/types'

import { Typography } from '@/components/ui/typography'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Card, CardContent } from '@/components/ui/card'
import { UserAvatar } from '../UserAvatar'

interface RecipePreviewCardProps {
  recipe: Recipe
  isHovered?: boolean
  className?: string
}

export const RecipePreviewCard = ({ recipe }: RecipePreviewCardProps) => {
  return (
    // <HoverCard>
    //   <HoverCardTrigger asChild>
    <Card>
      <CardContent className="p-3 flex flex-col gap-2">
        <Typography variant="bold" className="line-clamp-1 long-dashed-border">
          {recipe.title}
        </Typography>
        <UserAvatar user={recipe.author} />
      </CardContent>
    </Card>
    //   </HoverCardTrigger>
    //   <HoverCardContent className="z-10">
    //     <div className="flex flex-row gap-4">
    //       {recipe.titleImage && (
    //         <img
    //           src={recipe.titleImage.url}
    //           alt={recipe.title}
    //           className="w-[50px] h-full object-cover"
    //         />
    //       )}
    //       <div>
    //         <Typography variant="h5">{recipe.title}</Typography>
    //         <Typography variant="pn">{recipe.description}</Typography>
    //       </div>
    //     </div>
    //   </HoverCardContent>
    // </HoverCard>
  )
}
