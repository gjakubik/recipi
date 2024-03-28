'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MenuWithRecipes, Recipe } from '@/types'
import { motion } from 'framer-motion'
import { useToast } from '@/components/ui/use-toast'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Typography } from '@/components/ui/typography'
import { Checkbox } from '@/components/ui/checkbox'
import { RecipePreviewCard } from '@/components/recipe/RecipePreviewCard'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Toggle } from '../ui/toggle'

interface MenuListItemProps {
  index: number
  menu: MenuWithRecipes
}

export const MenuListItem = ({ index, menu }: MenuListItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Link href={`/menu/${menu.id}`} key={index}>
      <div className="dashed-border-hover flex flex-col gap-2 ">
        <div className="flex w-full flex-row items-center justify-between gap-4 hover:cursor-pointer sm:grid sm:grid-cols-[1fr_auto] ">
          <div className="flex flex-col gap-4 sm:grid sm:grid-cols-[1fr_auto]">
            <div className="flex flex-col">
              <Typography variant="h5">{menu.title}</Typography>
              <Typography variant="pn" className="line-clamp-2">
                {menu.description}
              </Typography>
            </div>
            <div className="grid grid-cols-[140px_90px] items-center">
              <Typography variant="light">Updated {menu.updatedAt}</Typography>
              <Typography variant="pn">
                {menu.recipes ? menu.recipes.length : '0'} recipe
                {(menu.recipes?.length !== 1 || !menu.recipes) && 's'}
              </Typography>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Toggle
              pressed={isOpen}
              onClick={(e) => {
                e.preventDefault()
                setIsOpen(!isOpen)
              }}
            >
              {isOpen ? (
                <EyeIcon width={16} className="min-w-[16px]" />
              ) : (
                <EyeOffIcon width={16} className="min-w-[16px]" />
              )}
            </Toggle>
          </div>
        </div>
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? 120 : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="flex w-full flex-col items-center justify-center overflow-hidden"
        >
          {isOpen && (
            <div
              className="w-full px-10"
              // onClick={() => setIsOpen(!isOpen)}
            >
              {menu.recipeInfo && menu.recipeInfo.length !== 0 ? (
                <Carousel
                  opts={{
                    align: 'start',
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-1 md:-ml-2">
                    {menu.recipeInfo.map((recipe, index) => (
                      <CarouselItem
                        key={index}
                        className="basis-1/2 pl-1 sm:basis-1/3 md:pl-2"
                      >
                        <div className="p-1">
                          {recipe && <RecipePreviewCard recipe={recipe} />}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-10" />
                  <CarouselNext className="-right-10" />
                </Carousel>
              ) : (
                <Typography className="text-center">
                  No recipes in this menu
                </Typography>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </Link>
  )
}

interface CheckedMenuListItemProps {
  index: number
  menu: MenuWithRecipes
  recipe?: Recipe
  initiallyChecked: boolean
  selectedMenuIds?: number[]
  setSelectedMenuIds: (value: number[] | undefined) => void
}

export const CheckedMenuListItem = ({
  index,
  menu,
  recipe,
  initiallyChecked,
  selectedMenuIds,
  setSelectedMenuIds,
}: CheckedMenuListItemProps) => {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [checked, setChecked] = useState(initiallyChecked)

  const handleCheckedChange = (checked: boolean) => {
    if (checked) {
      if (menu.recipes?.some((id) => id === recipe?.id)) {
        toast({
          title: 'Recipe already in menu',
          description: 'This recipe is already in this menu',
        })
        return
      }
      !selectedMenuIds?.includes(menu.id) &&
        setSelectedMenuIds?.(
          selectedMenuIds ? [menu.id, ...selectedMenuIds] : [menu.id]
        )
    } else {
      setSelectedMenuIds?.(selectedMenuIds?.filter((id) => id !== menu.id))
    }
    setChecked(checked)
  }

  return (
    <div className="dashed-border-hover flex w-full flex-col" key={index}>
      <div className="flex w-full flex-row items-center gap-4">
        <Checkbox
          checked={checked}
          onCheckedChange={(checked) =>
            handleCheckedChange(checked === 'indeterminate' ? false : checked)
          }
          className="hover:cursor-pointer"
        />
        <div
          className="flex w-full flex-row items-center justify-between gap-4 hover:cursor-pointer sm:grid sm:grid-cols-[1fr_auto]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-col sm:grid sm:grid-cols-[1fr_auto] sm:gap-4">
            <div className="flex flex-col">
              <Typography variant="h5">{menu.title}</Typography>
              <Typography variant="pn" className="line-clamp-2">
                {menu.description}
              </Typography>
            </div>
            <div className="grid grid-cols-[140px_90px] items-center">
              <Typography variant="light">Updated {menu.updatedAt}</Typography>
              <Typography variant="pn">
                {menu.recipes ? menu.recipes.length : '0'} recipe
                {(menu.recipes?.length !== 1 || !menu.recipes) && 's'}
              </Typography>
            </div>
          </div>
          <Toggle pressed={isOpen}>
            {isOpen ? (
              <EyeIcon width={16} className="min-w-[16px]" />
            ) : (
              <EyeOffIcon width={16} className="min-w-[16px]" />
            )}
          </Toggle>
        </div>
      </div>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 120 : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="flex w-full flex-col items-center justify-center overflow-hidden"
      >
        {isOpen && (
          <div
            className="w-full px-10 md:w-[720px] lg:w-[750px]"
            // onClick={() => setIsOpen(!isOpen)}
          >
            {menu.recipeInfo && menu.recipeInfo.length !== 0 ? (
              <Carousel
                opts={{
                  align: 'start',
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-1 md:-ml-2">
                  {menu.recipeInfo.map((recipe, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-1/2 pl-1 sm:basis-1/3 md:pl-2"
                    >
                      <div className="p-1">
                        {recipe && <RecipePreviewCard recipe={recipe} />}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-10" />
                <CarouselNext className="-right-10" />
              </Carousel>
            ) : (
              <Typography className="text-center">
                No recipes in this menu
              </Typography>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}
