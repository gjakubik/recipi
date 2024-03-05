import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'

export const LoadingCards = (
  <>
    {Array.from({ length: 6 }).map((_, i) => (
      <Card key={i}>
        <CardHeader className="pb-2">
          <CardTitle>
            <Skeleton className="h-6" />
          </CardTitle>
          {/* This is to take up image space, add back when more recipes have images */}
          {/* <Skeleton className="h-32" /> */}
          <CardDescription className="flex flex-col gap-0.5">
            <Skeleton className="h-3" />
            <Skeleton className="h-3" />
            <Skeleton className="h-3" />
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-14" />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
          </div>
          <Skeleton className="h-3 w-6" />
          <Separator className="mb-4" />
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-1">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-24" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-row justify-end gap-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </CardFooter>
      </Card>
    ))}
  </>
)

export const WideLoadingCards = (
  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {LoadingCards}
  </div>
)

export const SkinnyLoadingCards = (
  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
    {LoadingCards}
  </div>
)
