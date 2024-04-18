'use client'

import { PropsWithChildren, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from 'next-auth'
import { parseAsInteger, useQueryState } from 'nuqs'
import {
  Recipe,
  GetMenusResult,
  MenuWithRecipes,
  MenuQueryParams,
} from '@/types'
import { getMenu, updateMenu } from '@/lib/db/api'
import useMenuParams from '@/app/store/useMenuParams'
import { useMediaQuery } from '@/hooks/use-media-query'
import { DEFAULT_PARAM_NAMES, MENU_QUERY } from '@/lib/constants'

import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { FullClientMenuList } from '@/components/menu/FullClientMenuList'
import { UpsertMenuModal } from '@/components/modals/UpsertMenuModal'
import {
  DrawerOrDialog,
  DrawerOrDialogFooter,
} from '@/components/DrawerOrDialog'

interface AddRecipeToMenusModalProps extends PropsWithChildren {
  recipe: Recipe
  menus: MenuWithRecipes[]
  user: User
  paramNames?: MenuQueryParams
  ctlIsOpen?: boolean
  setCtlIsOpen?: (value: boolean) => void
}

export const AddRecipeToMenusModal = ({
  recipe,
  menus,
  user,
  paramNames,
  ctlIsOpen,
  setCtlIsOpen,
  children,
}: AddRecipeToMenusModalProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const [pageSize, setPageSize] = useQueryState(
    paramNames?.limit || DEFAULT_PARAM_NAMES.limit,
    parseAsInteger.withDefault(MENU_QUERY.limit)
  )
  const [selectedMenuIds, setSelectedMenuIds] = useState<number[] | undefined>()
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isSmallScreen = useMediaQuery(840)

  const isParentControlled = setCtlIsOpen !== undefined

  useEffect(() => {
    console.log('pageSize', pageSize)
    if (isSmallScreen) {
      pageSize !== 3 && setPageSize(3)
    } else {
      pageSize !== MENU_QUERY.limit && setPageSize(MENU_QUERY.limit)
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

  return (
    <DrawerOrDialog
      title="Add Recipe to Menu"
      description="Select a menu to add your recipe to"
      isOpen={isParentControlled ? ctlIsOpen || false : isOpen}
      setIsOpen={isParentControlled ? setCtlIsOpen : setIsOpen}
      triggerChildren={children}
    >
      <FullClientMenuList
        className="w-full px-6 py-4 md:px-12"
        menus={menus}
        recipe={recipe}
        paramNames={paramNames}
        selectedMenuIds={selectedMenuIds}
        setSelectedMenuIds={setSelectedMenuIds}
      />
      <DrawerOrDialogFooter>
        <div className="flex w-full flex-row items-center justify-end gap-4">
          <UpsertMenuModal user={user}>
            <Button variant="ghost">Create Menu</Button>
          </UpsertMenuModal>
          <Button onClick={onSave}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </DrawerOrDialogFooter>
    </DrawerOrDialog>
  )
}
