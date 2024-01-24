'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Recipe } from '@/types'
import { User } from 'next-auth'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { DeleteRecipeConfirmation } from '@/components/modals/DeleteRecipeConfirmation'

import { MoreHorizontal } from 'lucide-react'

interface RecipeActionsDropdownProps {
  user?: User
  recipe: Recipe
}

export const RecipeActionsDropdown = ({
  user,
  recipe,
}: RecipeActionsDropdownProps) => {
  const [deleteConfOpen, setDeleteConfOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <MoreHorizontal width={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {user?.id === recipe.author.id && (
            <>
              <DropdownMenuItem>
                <Link href={`/recipe/${recipe.id}/edit`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDeleteConfOpen(true)}>
                Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteRecipeConfirmation
        recipeId={recipe.id}
        open={deleteConfOpen}
        setOpen={setDeleteConfOpen}
      />
    </>
  )
}
