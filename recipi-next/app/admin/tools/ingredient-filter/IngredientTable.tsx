'use client'

import { Ingredient } from '@/types'

import { DataTable } from '@/components/table/DataTable'
import { columns } from '@/components/table/ingredients/columns'

interface IngredientTableProps {
  ingredients: Ingredient[]
}

export const IngredientTable = ({ ingredients }: IngredientTableProps) => {
  return <DataTable data={ingredients} columns={columns} />
}
