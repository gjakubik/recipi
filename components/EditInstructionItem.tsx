import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useFormContext } from 'react-hook-form'

import { Textarea } from '@/components/ui/textarea'
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons'

interface EditInstructionItemProps {
  id: string
  index: number
  onDelete?: (id: string) => void
}

export const EditInstructionItem = ({
  index,
  id,
  onDelete,
}: EditInstructionItemProps) => {
  const form = useFormContext()
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      key={id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex flex-row items-center gap-4 pt-4"
    >
      <HamburgerMenuIcon {...listeners} />
      <Typography variant="bold">{index + 1}</Typography>
      <FormField
        control={form.control}
        name={`instructions.${index}.instruction`}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <Textarea
                {...field}
                placeholder="Add an instruction..."
                className="w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button variant="ghost" className="p-2.5" onClick={() => onDelete?.(id)}>
        <Cross1Icon />
      </Button>
    </div>
  )
}
