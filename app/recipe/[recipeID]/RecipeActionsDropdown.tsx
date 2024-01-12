'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GetMenusResult, Recipe } from '@/types'
import { User } from 'next-auth'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { AddRecipeToMenusModal } from '@/components/modals/AddRecipeToMenusModal'
import { DeleteRecipeConfirmation } from '@/components/modals/DeleteRecipeConfirmation'

import { MoreHorizontal } from 'lucide-react'

interface RecipeActionsDropdownProps {
  user?: User
  recipe: Recipe
  initialMenus: GetMenusResult
}

export const RecipeActionsDropdown = ({
  user,
  recipe,
  initialMenus,
}: RecipeActionsDropdownProps) => {
  const [addToMenuOpen, setAddToMenuOpen] = useState(false)
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
          {!!user && (
            <DropdownMenuItem onClick={() => setAddToMenuOpen(true)}>
              Add to menu
            </DropdownMenuItem>
          )}
          {user?.id === recipe.author.id && (
            <>
              <DropdownMenuSeparator />
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
      {!!user && (
        <AddRecipeToMenusModal
          ctlIsOpen={addToMenuOpen}
          setCtlIsOpen={setAddToMenuOpen}
          user={user}
          recipe={recipe}
          initialMenus={initialMenus}
        />
      )}
    </>
  )
}
