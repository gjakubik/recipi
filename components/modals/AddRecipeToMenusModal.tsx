'use client'

import { PropsWithChildren, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from 'next-auth'
import { Recipe, Menu, MenuWithRecipes } from '@/types'
import { updateMenu } from '@/lib/db/api'
import useMenuParams from '@/app/store/useMenuParams'

import { useToast } from '@/components/ui/use-toast'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ClientMenuList } from '../menu/ClientMenuList'
import { revalidatePath } from 'next/cache'

interface AddRecipeToMenusModalProps extends PropsWithChildren {
  recipe: Recipe
  menus?: MenuWithRecipes[]
}

export const AddRecipeToMenusModal = ({
  recipe,
  menus,
  children,
}: AddRecipeToMenusModalProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const { limit, page, sort, sortBy, setPage } = useMenuParams()
  const [selectedMenuIds, setSelectedMenuIds] = useState<number[] | undefined>()
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSave = async () => {
    console.log('save')
    console.log(selectedMenuIds)
    console.log(menus)
    console.log(recipe)
    setIsSubmitting(true)

    selectedMenuIds?.forEach(async (menuId) => {
      const menu = menus?.find((menu) => menu.id === menuId)
      if (menu) {
        const updatedMenu = {
          ...menu,
          recipes: menu.recipes ? [recipe.id, ...menu.recipes] : [recipe.id],
        }
        console.log(updatedMenu)
        try {
          await updateMenu(updatedMenu)
        } catch (error) {
          console.log(error)
          toast({
            title: 'Error',
            description: `Error adding recipe ${recipe.title} to menu ${menu.title}`,
            variant: 'destructive',
          })
        }
      }
    })

    toast({
      title: 'Success',
      description: `Successfully added recipe ${recipe.title} to menus`,
    })
    router.refresh()
    setIsSubmitting(false)
    setIsOpen(false)
  }

  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-fit max-w-none">
        <DialogHeader>
          <DialogTitle>Add Recipe to Menu</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Select a menu to add your recipe to
        </DialogDescription>
        <ClientMenuList
          className="w-full md:min-w-[800px] px-6 md:px-12 py-4"
          menus={menus}
          recipe={recipe}
          count={menus?.length || 0}
          params={{ limit, page, sort, sortBy, setPage }}
          selectedMenuIds={selectedMenuIds}
          setSelectedMenuIds={setSelectedMenuIds}
        />
        <DialogFooter>
          <Button onClick={onSave}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
