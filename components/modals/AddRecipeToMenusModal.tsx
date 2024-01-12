'use client'

import { PropsWithChildren, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from 'next-auth'
import { Recipe, GetMenusResult } from '@/types'
import { getMenu, updateMenu } from '@/lib/db/api'
import useMenuParams from '@/app/store/useMenuParams'
import { useMediaQuery } from '@/hooks/use-media-query'
import { MENU_QUERY } from '@/lib/constants'

import { useToast } from '@/components/ui/use-toast'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
import { ClientMenuList } from '@/components/menu/ClientMenuList'
import { UpsertMenuModal } from '@/components/modals/UpsertMenuModal'

interface AddRecipeToMenusModalProps extends PropsWithChildren {
  recipe: Recipe
  initialMenus: GetMenusResult
  user: User
  ctlIsOpen?: boolean
  setCtlIsOpen?: (value: boolean) => void
}

export const AddRecipeToMenusModal = ({
  recipe,
  initialMenus,
  user,
  ctlIsOpen,
  setCtlIsOpen,
  children,
}: AddRecipeToMenusModalProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const [menuParams, setMenuParams] = useState({
    ...MENU_QUERY,
    authorId: user.id,
  })
  const [selectedMenuIds, setSelectedMenuIds] = useState<number[] | undefined>()
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isSmallScreen = useMediaQuery(840)

  const isParentControlled = setCtlIsOpen !== undefined

  useEffect(() => {
    if (isSmallScreen) {
      setMenuParams({ ...menuParams, limit: 3 })
    } else {
      setMenuParams({ ...menuParams, limit: 6 })
    }
  }, [isSmallScreen])

  const onSave = async () => {
    selectedMenuIds?.forEach(async (menuId) => {
      const menu = await getMenu(menuId)
      if (menu) {
        const updatedMenu = {
          ...menu,
          recipes: menu.recipes ? [recipe.id, ...menu.recipes] : [recipe.id],
        }
        console.log(updatedMenu)
        try {
          await updateMenu({
            id: updatedMenu.id,
            title: updatedMenu.title,
            description: updatedMenu.description,
            authorId: updatedMenu.authorId,
            recipes: updatedMenu.recipes,
            creationDate: updatedMenu.creationDate,
            updatedAt: updatedMenu.updatedAt,
            author: updatedMenu.author,
          })
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
    setIsSubmitting(false)
    isParentControlled ? setCtlIsOpen(false) : setIsOpen(false)
  }

  if (isSmallScreen) {
    return (
      <Drawer
        modal
        open={isParentControlled ? ctlIsOpen : isOpen}
        onOpenChange={isParentControlled ? setCtlIsOpen : setIsOpen}
      >
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
            initialData={initialMenus}
            recipe={recipe}
            params={{
              authorId: menuParams.authorId,
              limit: menuParams.limit,
              page: menuParams.page,
              sort: menuParams.sort,
              sortBy: menuParams.sortBy,
              setPage: (value) => setMenuParams({ ...menuParams, page: value }),
              setLimit: (value) =>
                setMenuParams({ ...menuParams, limit: value }),
            }}
            selectedMenuIds={selectedMenuIds}
            setSelectedMenuIds={setSelectedMenuIds}
          />
          <DrawerFooter>
            <div className="w-full flex flex-row items-center justify-end gap-4">
              <UpsertMenuModal user={user}>
                <Button variant="ghost">Create Menu</Button>
              </UpsertMenuModal>
              <Button onClick={onSave}>
                {isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog
      modal
      open={isParentControlled ? ctlIsOpen : isOpen}
      onOpenChange={isParentControlled ? setCtlIsOpen : setIsOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Add Recipe to Menu</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Select a menu to add your recipe to
        </DialogDescription>
        <ClientMenuList
          className="w-full px-6 md:px-12 py-4"
          initialData={initialMenus}
          recipe={recipe}
          params={{
            authorId: menuParams.authorId,
            limit: menuParams.limit,
            page: menuParams.page,
            sort: menuParams.sort,
            sortBy: menuParams.sortBy,
            setPage: (value) => setMenuParams({ ...menuParams, page: value }),
            setLimit: (value) => setMenuParams({ ...menuParams, limit: value }),
          }}
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
