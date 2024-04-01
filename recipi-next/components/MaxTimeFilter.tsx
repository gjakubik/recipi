import { useState } from 'react'
import { motion } from 'framer-motion'
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
        <CollapsibleTrigger className="[&>svg]:mb-2" />
        <div className="flex w-full flex-grow flex-col gap-2">
          <div>
            <Label htmlFor={label}>{label}</Label>
            {!maxManualOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex cursor-pointer items-center gap-1"
                onClick={() => setMaxManualOpen((prev) => !prev)}
              >
                <Typography variant="tinyextralight">
                  Expand to input numbers
                </Typography>
              </motion.div>
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
