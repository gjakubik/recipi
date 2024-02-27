'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryState, parseAsInteger } from 'nuqs'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  ClientPaginationPrevious,
  ClientPaginationButton,
  ClientPaginationNext,
} from '@/components/ui/pagination'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'
import { Separator } from '@/components/ui/separator'

/*
 * mode: determines wether the pagination will refresh the page to get new data, or let another client component take care of it
 * title: the title of the component to render next to top pagination
 * count: the total number of items to paginate
 * paramNames: the names of the query parameters to use for pagination
 * defaultLimit: the default limit to use for pagination
 * withPageInfo: if true, will display a page size input and page info
 */
interface UrlPaginationProps {
  mode?: 'client' | 'server'
  title?: string
  count: number
  paramNames: {
    page: string
    limit: string
  }
  defaultLimit?: number
  withPageInfo?: boolean
}

export const UrlPagination = ({
  mode = 'client',
  title,
  count,
  paramNames,
  defaultLimit = 10,
  withPageInfo,
}: UrlPaginationProps) => {
  const router = useRouter()
  const { page: pageParam, limit: limitParam } = paramNames

  const [pageState, setPageState] = useQueryState(pageParam, parseAsInteger)
  const [limitState, setLimitState] = useQueryState(limitParam, parseAsInteger)

  const page = pageState || 0
  const limit = limitState || defaultLimit

  const [clientLimitState, setClientLimitState] = useState(limit)

  //find if the next page and the page in 2 exist
  //if they do, display the ellipsis
  const totalPages = Math.ceil(count / limit)
  const showPreviousEllipsis = page > 1
  const showNextEllipsis = page < totalPages - 2
  const showNext = page < totalPages - 1

  const isServer = mode === 'server'

  return (
    <div className="mt-4 flex w-full flex-col-reverse justify-between gap-4 sm:flex-row">
      {withPageInfo ? (
        <div className="flex flex-row items-center gap-4">
          <Typography variant="pn">
            {page * limit}-{Math.min(page * limit + limit, count)} of {count}
          </Typography>
          <Separator orientation="vertical" />
          <div className="flex flex-row items-center gap-2">
            <Typography variant="pn">Per Page: </Typography>
            <Input
              type="number"
              min="1"
              max="100"
              value={clientLimitState}
              onChange={(e) => setClientLimitState(parseInt(e.target.value))}
              onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  await setLimitState(clientLimitState)
                  isServer && router.refresh()
                }
              }}
              onBlur={async () => {
                await setLimitState(clientLimitState)
                isServer && router.refresh()
              }}
              className="w-16"
            />
          </div>
        </div>
      ) : title ? (
        <Typography variant="h3">{title}</Typography>
      ) : (
        <div />
      )}
      <Pagination className="mx-0 w-fit">
        <PaginationContent>
          {page !== 0 && (
            <ClientPaginationPrevious
              disabled={page === 0}
              onClick={async () => {
                await setPageState(page - 1)
                isServer && router.refresh()
              }}
            />
          )}

          {page !== 0 && (
            <ClientPaginationButton
              onClick={async () => {
                await setPageState(0)
                isServer && router.refresh()
              }}
            >
              0
            </ClientPaginationButton>
          )}

          {showPreviousEllipsis && <PaginationEllipsis />}

          <ClientPaginationButton isActive>{page}</ClientPaginationButton>

          {showNextEllipsis && <PaginationEllipsis />}

          {page !== totalPages - 1 && (
            <ClientPaginationButton
              onClick={async () => {
                await setPageState(totalPages - 1)
                isServer && router.refresh()
              }}
            >
              {totalPages - 1}
            </ClientPaginationButton>
          )}

          {showNext && (
            <ClientPaginationNext
              disabled={!showNext}
              onClick={async () => {
                await setPageState(page + 1)
                isServer && router.refresh()
              }}
            />
          )}
        </PaginationContent>
      </Pagination>
    </div>
  )
}