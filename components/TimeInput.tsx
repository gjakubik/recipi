'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { TIME_OPTIONS } from '@/lib/constants'

export interface TimeInputProps {
  name: 'preparationTime' | 'cookingTime'
}

export const TimeInput = ({ name }: TimeInputProps) => {
  const { control } = useFormContext()

  return (
    <div className="flex flex-row items-end gap-2">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {name === 'preparationTime' ? 'Prep Time' : 'Cook Time'}
            </FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="w-[170px]">
                  <SelectValue placeholder="Minutes" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  {TIME_OPTIONS.map((option) => {
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
