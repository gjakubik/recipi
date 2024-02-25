'use client'

import { useState, useMemo } from 'react'
import { useQueryState } from 'nuqs'
import { useRouter } from 'next/navigation'
import { Ingredient } from '@/types'
import { deleteIngredients, markIngredients } from '@/lib/db/api'

import { DataTable } from '@/components/table/DataTable'
import { columns } from '@/components/table/ingredients/columns'
import { RowSelectionState } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

interface IngredientTableProps {
  ingredients: Ingredient[]
}

export const IngredientTable = ({ ingredients }: IngredientTableProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const selectedIngredients = useMemo(() => {
    return Object.keys(rowSelection).map((id) => ingredients[parseInt(id)].id)
  }, [rowSelection])

  console.log(`Ingredients: ${ingredients}`)

  const ingredientName = useMemo(
    () => ingredients[0].description?.split(',')[0],

    [ingredients]
  )

  const hasSameName = useMemo(
    () =>
      ingredients.every(
        (ing) =>
          ing.description?.split(',')[0]?.toLowerCase() ===
          ingredientName?.toLowerCase()
      ),
    [ingredients, ingredientName]
  )

  return (
    <>
      <DataTable
        data={ingredients}
        columns={columns}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        searchColumn="description"
      />
      <div className="flex flex-row justify-end gap-4">
        <Button
          onClick={async () => {
            if (selectedIngredients.length === 0) return
            try {
              await deleteIngredients(selectedIngredients)
              const toastDescription = selectedIngredients
                .slice(0, 3)
                .join(', ')
              toast({
                title: 'Success',
                description: `Ingredients Deleted: ${toastDescription}${selectedIngredients.length > 3 ? '...' : ''}`,
              })
              router.refresh()
            } catch (error) {
              console.log(error)
              toast({
                title: 'Error',
                description: 'Failed to delete ingredients',
              })
            }
          }}
          disabled={selectedIngredients.length === 0}
        >
          Delete Selected Ingredients
        </Button>
        {hasSameName && (
          <Button
            onClick={async () => {
              try {
                await markIngredients(ingredients.map((ing) => ing.id))
                toast({
                  title: 'Success',
                  description: `Marked all ingredients starting with ${ingredientName} as processed`,
                })
              } catch (error) {
                console.log(error)
                toast({
                  title: 'Error',
                  description: 'Failed to mark ingredients as processed',
                })
              }
              // Add a small wait time to allow the database to update
              setTimeout(() => {
                router.refresh()
              }, 500)
            }}
          >
            Mark {ingredientName} as processed
          </Button>
        )}
      </div>
    </>
  )
}
