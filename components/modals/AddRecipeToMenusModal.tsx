'use client'

import { PropsWithChildren, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from 'next-auth'
import { Recipe, Menu, MenuWithRecipes } from '@/types'
import { updateMenu } from '@/lib/db/api'
import useMenuParams from '@/app/store/useMenuParams'
import { useMediaQuery } from '@/hooks/use-media-query'

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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { ClientMenuList } from '../menu/ClientMenuList'
import { revalidatePath } from 'next/cache'
import { UpsertMenuModal } from './UpsertMenuModal'

interface AddRecipeToMenusModalProps extends PropsWithChildren {
  recipe: Recipe
  menus?: MenuWithRecipes[]
  user: User
}

export const AddRecipeToMenusModal = ({
  recipe,
  menus,
  user,
  children,
}: AddRecipeToMenusModalProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const { limit, page, sort, sortBy, setPage, setLimit } = useMenuParams()
  const [selectedMenuIds, setSelectedMenuIds] = useState<number[] | undefined>()
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isSmallScreen = useMediaQuery(700)

  useEffect(() => {
    if (isSmallScreen) {
      setLimit(3)
    } else {
      setLimit(6)
    }
  }, [isSmallScreen])

  const onSave = async () => {
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

  if (isSmallScreen) {
    return (
      <Drawer modal open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
          <DrawerClose />
          <DrawerHeader>
            <DrawerTitle>Add Recipe to Menu</DrawerTitle>
            <DrawerDescription>
              Select a menu to add your recipe to
            </DrawerDescription>
          </DrawerHeader>
          <ClientMenuList
            className="w-full px-6 md:px-12 py-4"
            menus={menus}
            recipe={recipe}
            count={menus?.length || 0}
            params={{ limit, page, sort, sortBy, setPage }}
            selectedMenuIds={selectedMenuIds}
            setSelectedMenuIds={setSelectedMenuIds}
          />
          <DrawerFooter>
            <Button onClick={onSave}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-[900px]">
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
          <div className="w-full flex flex-row items-center justify-end gap-4">
            <UpsertMenuModal user={user}>
              <Button variant="ghost">Create Menu</Button>
            </UpsertMenuModal>
            <Button onClick={onSave}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
