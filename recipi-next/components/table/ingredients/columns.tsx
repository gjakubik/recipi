import { ColumnDef } from '@tanstack/react-table'
import { Ingredient } from '@/types'
import { useToast } from '@/components/ui/use-toast'

import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Typography } from '@/components/ui/typography'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

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
      <div className="ml-2 p-4">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: 'FDC ID',
    accessorKey: 'fdc_id',
    cell: ({ row }) => (
      <Typography variant="pn" className="mr-2 px-2">
        {row.original.fdcId}
      </Typography>
    ),
  },
  {
    header: 'Description',
    accessorKey: 'description',
    cell: ({ row }) => (
      <Typography variant="pn" className="w-max">
        {row.original.description}
      </Typography>
    ),
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
    columns: [
      {
        header: 'Unit',
        cell: ({ row }) =>
          row.original.portions.map((portion, i) => {
            if (!portion.value) return null
            return (
              <div
                key={`unit-${i}`}
                className="mb-1 mt-1 flex w-full flex-col gap-1 p-0"
              >
                <Tooltip>
                  <TooltipTrigger>
                    <div className="line-clamp-1">{portion.unit}</div>
                  </TooltipTrigger>
                  <TooltipContent>{portion.unit}</TooltipContent>
                </Tooltip>
                {i < row.original.portions.length - 1 && (
                  <Separator className="w-full" />
                )}
              </div>
            )
          }),
      },
      {
        header: 'Abbreviation',
        cell: ({ row }) =>
          row.original.portions.map((portion, i) => (
            <div
              key={`abb-${i}`}
              className="mb-1 mt-1 flex w-full flex-col gap-1 p-0"
            >
              {['undetermined', ''].includes(portion.abbreviation || '')
                ? 'N/A'
                : portion.abbreviation}
              {i < row.original.portions.length - 1 && (
                <Separator className="w-full" />
              )}
            </div>
          )),
      },
      {
        header: 'Value',
        cell: ({ row }) =>
          row.original.portions.map((portion, i) => (
            <div
              key={`val-${i}`}
              className="mb-1 mt-1 flex w-full flex-col gap-1 p-0"
            >
              {portion.value}
              {i < row.original.portions.length - 1 && (
                <Separator className="w-full" />
              )}
            </div>
          )),
      },
      {
        header: 'Gram Weight',
        cell: ({ row }) =>
          row.original.portions.map((portion, i) => (
            <div
              key={`gram-${i}`}
              className="mb-1 mt-1 flex w-full flex-col gap-1 p-0"
            >
              {portion.gram_weight}
              {i < row.original.portions.length - 1 && (
                <Separator className="w-full" />
              )}
            </div>
          )),
      },
      {
        header: 'Grams/Unit',
        cell: ({ row }) =>
          row.original.portions.map((portion, i) => (
            <div
              key={`gpu-${i}`}
              className="mb-1 mt-1 flex w-full flex-col gap-1 p-0"
            >
              {portion.gram_per_unit}
              {i < row.original.portions.length - 1 && (
                <Separator className="w-full" />
              )}
            </div>
          )),
      },
    ],
  },
  {
    header: 'ID',
    accessorKey: 'id',
    cell: ({ row }) => {
      const { toast } = useToast()
      return (
        <Tooltip>
          <TooltipTrigger
            onClick={() => {
              if (window) {
                navigator.clipboard.writeText(row.original.id)
                toast({
                  title: 'Copied to clipboard',
                  description: row.original.id,
                })
              }
            }}
          >
            <Typography
              variant="pn"
              className={`line-clamp-${Math.min(row.original.portions.length, 4)} px-2`}
            >
              {row.original.id}
            </Typography>
          </TooltipTrigger>
          <TooltipContent>{row.original.id}</TooltipContent>
        </Tooltip>
      )
    },
  },
]
