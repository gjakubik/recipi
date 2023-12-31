'use client'

import { PropsWithChildren, useState } from 'react'
import _ from 'lodash'

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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface AddIngredientModalProps extends PropsWithChildren {
  addCustomUnit: (unit: string) => void
}

export const AddUnitModal = ({
  children,
  addCustomUnit,
}: AddIngredientModalProps) => {
  const [unit, setUnit] = useState('')

  const onUnitSave = () => {
    console.log('unit', unit)
    addCustomUnit(_.capitalize(unit))
    setUnit('')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Unit</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Add a new unit to make your recipe more accurate
        </DialogDescription>

        <Input
          placeholder="Add a unit..."
          className="w-full"
          value={unit}
          onChange={(e) => {
            e.preventDefault()
            setUnit(e.target.value)
          }}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onUnitSave}>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
