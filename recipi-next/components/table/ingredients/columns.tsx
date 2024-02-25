import { ColumnDef } from '@tanstack/react-table'
import { Ingredient } from '@/types'

import { Checkbox } from '@/components/ui/checkbox'

export const columns: ColumnDef<Ingredient>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: 'Id',
    accessorKey: 'id',
  },
  {
    header: 'FDC Id',
    accessorKey: 'fdcId',
  },
  {
    header: 'Description',
    accessorKey: 'description',
  },
  {
    header: 'Calories',
    accessorKey: 'calories',
  },
  {
    header: 'Protein',
    accessorKey: 'protein',
  },
  {
    header: 'Fat',
    accessorKey: 'fat',
  },
  {
    header: 'Carbs',
    accessorKey: 'carbs',
  },
  {
    header: 'Portions',
    accessorKey: 'portions',
  },
]
