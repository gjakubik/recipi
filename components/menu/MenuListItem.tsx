'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MenuWithRecipes, Recipe } from '@/types'
import { motion } from 'framer-motion'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { Checkbox } from '@/components/ui/checkbox'
import { RecipePreviewCard } from '@/components/recipe/RecipePreviewCard'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

interface MenuListItemProps {
  index: number
  menu: MenuWithRecipes
  recipe?: Recipe
  initiallyChecked?: boolean
  selectedMenuIds?: number[]
  setSelectedMenuIds?: (value: number[] | undefined) => void
}

export const MenuListItem = ({
  index,
  menu,
  recipe,
  selectedMenuIds,
  setSelectedMenuIds,
}: MenuListItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [checked, setChecked] = useState(
    menu.recipes?.some((id) => id === recipe?.id)
  )

  const isSelecting = setSelectedMenuIds !== undefined

  const handleCheckedChange = (checked: boolean) => {
    if (checked) {
      !selectedMenuIds?.includes(menu.id) &&
        setSelectedMenuIds?.(
          selectedMenuIds ? [menu.id, ...selectedMenuIds] : [menu.id]
        )
    } else {
      setSelectedMenuIds?.(selectedMenuIds?.filter((id) => id !== menu.id))
    }
    setChecked(checked)
  }

  if (isSelecting) {
    return (
      <div className="flex flex-col dashed-border-hover " key={index}>
        <div className="w-full flex flex-row gap-4 items-center">
          {isSelecting && (
            <Checkbox
              checked={checked}
              onCheckedChange={(checked) =>
                handleCheckedChange(
                  checked === 'indeterminate' ? false : checked
                )
              }
              className="hover:cursor-pointer"
            />
          )}
          <div
            className="w-full flex flex-row sm:grid sm:grid-cols-[1fr_auto] gap-4 justify-between items-center hover:cursor-pointer "
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex flex-col sm:grid sm:grid-cols-[1fr_auto] gap-4">
              <div className="flex flex-col">
                <Typography variant="h5">{menu.title}</Typography>
                <Typography variant="pn" className="line-clamp-2">
                  {menu.description}
                </Typography>
              </div>
              <div className="grid grid-cols-[140px_90px] items-center">
                <Typography variant="light">
                  Updated {menu.updatedAt?.toLocaleDateString()}
                </Typography>
                <Typography variant="pn">
                  {menu.recipes ? menu.recipes.length : '0'} recipe
                  {(menu.recipes?.length !== 1 || !menu.recipes) && 's'}
                </Typography>
              </div>
            </div>
            {isOpen ? (
              <EyeIcon width={16} className="min-w-[16px]" />
            ) : (
              <EyeOffIcon width={16} className="min-w-[16px]" />
            )}
          </div>
        </div>
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 120 : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col justify-center items-center overflow-hidden"
        >
          {isOpen && (
            <div
              className="w-full px-12"
              // onClick={() => setIsOpen(!isOpen)}
            >
              <Carousel
                opts={{
                  align: 'start',
                }}
                className="w-full"
              >
                <CarouselContent>
                  {menu.recipeInfo?.map((recipe, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-1/2 lg:basis-1/3"
                    >
                      <div className="p-1">
                        <RecipePreviewCard recipe={recipe} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          )}
        </motion.div>
      </div>
    )
  } else {
    return (
      <Link href={`/menu/${menu.id}`} key={index}>
        <div className="flex flex-col gap-2 dashed-border-hover ">
          <div className="w-full flex flex-row sm:grid sm:grid-cols-[auto_auto] gap-4 items-center hover:cursor-pointer ">
            <div className="flex flex-col sm:grid sm:grid-cols-[1fr_auto] gap-4">
              <div className="flex flex-col">
                <Typography variant="h5">{menu.title}</Typography>
                <Typography variant="pn" className="line-clamp-2">
                  {menu.description}
                </Typography>
              </div>
              <div className="grid grid-cols-[140px_90px] items-center">
                <Typography variant="light">
                  Updated {menu.updatedAt?.toLocaleDateString()}
                </Typography>
                <Typography variant="pn">
                  {menu.recipes ? menu.recipes.length : '0'} recipe
                  {(menu.recipes?.length !== 1 || !menu.recipes) && 's'}
                </Typography>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Button
                variant="ghost"
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
              </Button>
            </div>
          </div>
          <motion.div
            initial={false}
            animate={{
              height: isOpen ? 120 : 0,
              opacity: isOpen ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col justify-center items-center overflow-hidden"
          >
            {isOpen && (
              <div
                className="w-full px-12"
                // onClick={() => setIsOpen(!isOpen)}
              >
                <Carousel
                  opts={{
                    align: 'start',
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {menu.recipeInfo?.map((recipe, index) => (
                      <CarouselItem
                        key={index}
                        className="md:basis-1/2 lg:basis-1/3"
                      >
                        <div className="p-1">
                          <RecipePreviewCard recipe={recipe} />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            )}
          </motion.div>
        </div>
      </Link>
    )
  }
}
