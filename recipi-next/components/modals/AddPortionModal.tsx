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
import { PortionForm } from '@/components/forms/PortionForm'

interface AddIngredientModalProps extends PropsWithChildren {
  addCustomPortion: (
    unit: string,
    abbreviation: string,
    value: string,
    gramWeight: string,
    gramsPerUnit: string
  ) => void
}

export const AddPortionModal = ({
  children,
  addCustomPortion,
}: AddIngredientModalProps) => {
  const [unit, setUnit] = useState('')
  const [abbreviation, setAbbreviation] = useState('')
  const [value, setValue] = useState('')
  const [gramWeight, setGramWeight] = useState('')
  const [gramsPerUnit, setGramsPerUnit] = useState('')

  const onPortionSave = () => {
    addCustomPortion(unit, abbreviation, value, gramWeight, gramsPerUnit)
    setUnit('')
    setAbbreviation('')
    setValue('')
    setGramWeight('')
    setGramsPerUnit('')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Portion</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Enter portion data for this ingredient
        </DialogDescription>
        <PortionForm />
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onPortionSave}>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
