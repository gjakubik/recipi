'use client'

import * as React from 'react'
import { Clock } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { FormLabel } from '@/components/ui/form'
import { TimePickerInput } from './time-picker-input'

interface TimePickerProps {
  label?: string
  time: string
  setTime: (time: string) => void
}

export function TimePicker({ time, setTime, label }: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null)
  const hourRef = React.useRef<HTMLInputElement>(null)
  const secondRef = React.useRef<HTMLInputElement>(null)

  return (
    <div className="flex flex-col gap-2">
      <FormLabel className="pt-1.5 pb-1">{label}</FormLabel>
      <div className="flex items-end gap-2">
        <div className="grid gap-1 text-center">
          <TimePickerInput
            picker="hours"
            time={time}
            setTime={setTime}
            ref={hourRef}
            onRightFocus={() => minuteRef.current?.focus()}
          />
          <Label htmlFor="hours" className="text-xs">
            Hours
          </Label>
        </div>
        <div className="grid gap-1 text-center">
          <TimePickerInput
            picker="minutes"
            time={time}
            setTime={setTime}
            ref={minuteRef}
            onLeftFocus={() => hourRef.current?.focus()}
            onRightFocus={() => secondRef.current?.focus()}
          />
          <Label htmlFor="minutes" className="text-xs">
            Minutes
          </Label>
        </div>
        <div className="grid gap-1 text-center">
          <TimePickerInput
            picker="seconds"
            time={time}
            setTime={setTime}
            ref={secondRef}
            onLeftFocus={() => minuteRef.current?.focus()}
          />
          <Label htmlFor="seconds" className="text-xs">
            Seconds
          </Label>
        </div>
      </div>
    </div>
  )
}
