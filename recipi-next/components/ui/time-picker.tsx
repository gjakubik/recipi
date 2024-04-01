'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Clock } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { TimePickerInput } from './time-picker-input'

interface TimePickerProps {
  className?: string
  label?: string
  time: string
  setTime: (time: string) => void
}

export function TimePicker({
  className,
  time,
  setTime,
  label,
}: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null)
  const hourRef = React.useRef<HTMLInputElement>(null)
  const secondRef = React.useRef<HTMLInputElement>(null)

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label className="pb-1 pt-1.5">{label}</Label>
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
