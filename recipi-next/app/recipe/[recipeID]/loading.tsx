import { Skeleton } from '@/components/ui/skeleton'
import { Clock, Users } from 'lucide-react'

export default function LoadingRecipePage() {
  return (
    <>
      {/* Header */}
      <div className="flex w-full flex-col justify-between justify-items-center gap-2 sm:flex-row">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-5 w-72" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-28" />
        </div>
        <div className="flex flex-row gap-6">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
        </div>
      </div>

      {/* Difficulty, Prep and serving info */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-5 w-28" />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>

      {/* Ingredients */}
      <Skeleton className="h-7 w-28" />
      <div className="flex flex-col gap-5">
        <Skeleton className="h-4 w-96" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-80" />
        <Skeleton className="h-4 w-96" />
        <Skeleton className="h-4 w-52" />
      </div>

      {/* Instructions */}
      <Skeleton className="h-7 w-28" />
      <div className="flex flex-col gap-5">
        <Skeleton className="h-4 w-96" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-80" />
        <Skeleton className="h-4 w-96" />
        <Skeleton className="h-4 w-52" />
      </div>
    </>
  )
}
