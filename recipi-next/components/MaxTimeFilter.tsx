import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { secondsToTime, timeInSeconds } from '@/lib/utils'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { TimePicker } from '@/components/ui/time-picker'
import { Typography } from '@/components/ui/typography'

interface MaxTimeFilterProps {
  maxTimeState: string
  setMaxTimeState: (value: string) => void
  largestTime: string
  label: string
}

export const MaxTimeFilter = ({
  maxTimeState,
  setMaxTimeState,
  largestTime,
  label,
}: MaxTimeFilterProps) => {
  const [maxManualOpen, setMaxManualOpen] = useState(false)

  return (
    <Collapsible
      className="flex flex-col"
      open={maxManualOpen}
      onOpenChange={setMaxManualOpen}
    >
      <div className="flex w-full flex-row items-end gap-3">
        <CollapsibleTrigger
          className={maxManualOpen ? '[&>svg]:mb-3' : '[&>svg]:mb-[1.375rem]'}
        />
        <div className="flex w-full flex-grow flex-col gap-2">
          <div>
            <Label htmlFor={label}>{label}</Label>
            {maxManualOpen ? (
              <Typography variant="tinyextralight">Collapse</Typography>
            ) : (
              <Typography variant="tinyextralight">
                Expand to input numbers
              </Typography>
            )}
          </div>
          <Slider
            id={label}
            className={cn('w-full', {
              'pb-3': !maxManualOpen,
            })}
            value={[timeInSeconds(maxTimeState)]}
            onValueChange={(value) => setMaxTimeState(secondsToTime(value[0]))}
            min={0}
            max={timeInSeconds(largestTime)}
            step={60}
          />
        </div>
        <Typography
          variant="pn"
          className={maxManualOpen ? 'mb-[-10px]' : 'mb-0.5'}
        >
          {maxTimeState}
        </Typography>
      </div>
      <CollapsibleContent>
        <TimePicker
          className="ml-6"
          time={maxTimeState}
          setTime={(time) => setMaxTimeState(time)}
        />
      </CollapsibleContent>
    </Collapsible>
  )
}
