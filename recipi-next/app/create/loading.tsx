import { Typography } from '@/components/ui/typography'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const LoadingTimePicker = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="h-4 w-[68px]" />
    <div className="flex flex-row gap-2">
      <div className="flex flex-col items-center gap-1">
        <Skeleton className="h-9 w-[60px]" />
        <Skeleton className="h-2 w-8" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <Skeleton className="h-9 w-12" />
        <Skeleton className="h-2 w-12" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <Skeleton className="h-9 w-12" />
        <Skeleton className="h-2 w-12" />
      </div>
    </div>
  </div>
)

export default function LoadingCreatePage() {
  return (
    <>
      <Typography variant="h2">Create Recipe</Typography>
      <div className="flex-col space-y-8">
        <Alert>
           {/* AI Upload section */}
          <AlertTitle>
            <Skeleton className="h-4 w-[65px]" />
          </AlertTitle>
          <AlertDescription className="mt-2 flex w-full flex-col items-center justify-between gap-4 xs:flex-row sm:mt-0">
            <div className="flex w-full max-w-[370px] flex-col gap-1">
              <Skeleton className="h-3 " />
              <Skeleton className="h-3 sm:hidden" />
            </div>
            <Skeleton className="h-9 w-[100px]" />
          </AlertDescription>
        </Alert>

        {/* Title, Description, Image section */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
            <div className="flex flex-grow flex-col gap-4">
              <div className="flex w-full flex-col gap-2">
                {/* Title */}
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="flex w-full flex-col gap-2">
                {/* Description */}
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-36 w-full" />
              </div>
            </div>
            {/* Image Upload */}
            <Skeleton className="h-[246px] w-[306px]" />
          </div>
        </div>

        {/* Time, Servings, Difficulty section */}
        <div className="mt-2 flex flex-row flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-6 sm:flex-row">
            {/* Time Pickers */}
            <LoadingTimePicker />
            <LoadingTimePicker />
          </div>
          <div className="flex flex-row items-start gap-2">
            <div className="flex flex-col gap-2">
              {/* Servings */}
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-9 w-[80px]" />
            </div>
            <div className="flex flex-col gap-2">
              {/* Difficulty */}
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-9 w-[100px]" />
            </div>
          </div>
        </div>

        {/* Ingredients section */}
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full flex-row items-center justify-between">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-7 w-[135px]" />
          </div>
          <div className="flex w-full flex-col rounded-xl border bg-card shadow">
            <div className="m-4 p-2">
              <div className="m-auto mt-6 flex max-w-[600px] flex-row items-center gap-2  sm:mt-0 sm:items-end">
                {/* Hamburger */}
                <div className="mt-3 p-2.5">
                  <Skeleton className="h-6 w-6" />
                </div>
                <div className="flex w-full grow flex-col items-start gap-2 sm:flex-row sm:items-end">
                  <div className="flex w-full flex-row items-end gap-2">
                    <div className="flex flex-col gap-2">
                      {/* Amount */}
                      <Skeleton className="h-4 w-10" />
                      <Skeleton className="h-9 w-[40px] xs:w-[60px]" />
                    </div>
                    <div className="flex grow flex-col gap-2">
                      {/* Unit */}
                      <Skeleton className="h-4 w-9" />
                      <Skeleton className="h-9 w-full" />
                    </div>
                    {/* Add to note */}
                    <Skeleton className="hidden h-9 w-14 min-w-[3.5rem] xs:flex sm:hidden" />
                  </div>
                  <div className="flex w-full grow flex-col gap-2">
                    {/* Name */}
                    <Skeleton className="h-4 w-9" />
                    <Skeleton className="h-9 w-full" />
                  </div>
                  {/* Add to note */}
                  <Skeleton className="flex h-9 w-14 min-w-[3.5rem] xs:hidden sm:flex" />
                </div>
                <Skeleton className="mb-1 h-6 w-6 min-w-[1.5rem]" />
              </div>
              <div className="mt-4 flex w-full flex-row justify-end">
                <Skeleton className="h-9 w-24" />
              </div>
            </div>
          </div>
        </div>

        {/* Instructions section */}
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full flex-row items-center justify-between">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-7 w-[135px]" />
          </div>
          <div className="flex w-full flex-col rounded-xl border bg-card shadow">
            <div className="m-4 p-2">
              <div className="m-auto flex w-full max-w-[600px] flex-row items-center gap-4">
                <div className="self-start pt-3">
                  <Skeleton className="h-6 w-6" />
                </div>
                <div className="self-start pt-2">
                  <Skeleton className="h-8 w-3" />
                </div>
                <Skeleton className="h-[60px] w-full" />
                <Skeleton className="h-6 w-6" />
              </div>
              <div className="mt-4 flex w-full flex-row justify-end">
                <Skeleton className="h-9 w-24" />
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex w-full flex-row justify-between">
          <div className="flex flex-row gap-4">
            <Skeleton className="h-9 w-[67px]" />
            <Skeleton className="h-9 w-[76px]" />
          </div>
        </div>
      </div>
    </>
  )
}
