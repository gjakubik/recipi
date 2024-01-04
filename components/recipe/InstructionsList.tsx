import { twMerge } from 'tailwind-merge'

import { Typography } from '../ui/typography'

interface InstructionsListProps {
  instructions: string[] | null
  className?: string
}

export const InstructionsList = ({
  instructions,
  className,
}: InstructionsListProps) => {
  return (
    <div className={twMerge(className, 'flex flex-col gap-4')}>
      {instructions?.map((instruction, index) => (
        <div key={index} className="flex flex-row gap-4">
          <div className="flex flex-row justify-center items-center">
            <Typography variant="h5" className="self-start">
              {index + 1}
            </Typography>
          </div>
          <div>
            <Typography>{instruction}</Typography>
          </div>
        </div>
      ))}
    </div>
  )
}
