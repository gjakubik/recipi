import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Label } from '@/components/ui/label'
import { RangeSlider } from '@/components/ui/range-slider'
import { Typography } from '@/components/ui/typography'
import { Input } from '@/components/ui/input'

interface ServingsRangeFilterProps {
  minServingsState: number
  maxServingsState: number
  setMinServingsState: (value: number) => void
  setMaxServingsState: (value: number) => void
  label: string
}

export const ServingsRangeFilter = ({
  minServingsState,
  maxServingsState,
  setMinServingsState,
  setMaxServingsState,
  label,
}: ServingsRangeFilterProps) => {
  const [manualOpen, setManualOpen] = useState(false)

  return (
    <Collapsible
      className="flex flex-col"
      open={manualOpen}
      onOpenChange={setManualOpen}
    >
      <div className="flex w-full flex-row items-end gap-3">
        <CollapsibleTrigger className="[&>svg]:mb-2" />
        <div className="flex w-full flex-grow flex-col gap-2">
          <div>
            <Label htmlFor={label}>{label}</Label>
            {!manualOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex cursor-pointer items-center gap-1"
                onClick={() => setManualOpen((prev) => !prev)}
              >
                <Typography variant="tinyextralight">
                  Expand to input numbers
                </Typography>
              </motion.div>
            )}
          </div>
          <RangeSlider
            id={label}
            className={cn('w-full', {
              'pb-3': !manualOpen,
            })}
            value={[minServingsState, maxServingsState]}
            onValueChange={(value) => {
              setMinServingsState(value[0])
              setMaxServingsState(value[1])
            }}
            min={0}
            max={25}
            step={1}
          />
        </div>
        <Typography
          variant="pn"
          className={cn('min-w-[67px]', manualOpen ? 'mb-[-10px]' : 'mb-0.5')}
        >
          {minServingsState} - {maxServingsState}
        </Typography>
      </div>
      <CollapsibleContent>
        <div className="ml-6 flex gap-2 pb-1 pt-4">
          <Input
            type="number"
            value={minServingsState}
            onChange={(e) => setMinServingsState(parseInt(e.target.value))}
            min={0}
            max={maxServingsState}
          />
          <Input
            type="number"
            value={maxServingsState}
            onChange={(e) => setMaxServingsState(parseInt(e.target.value))}
            min={minServingsState}
            max={25}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
