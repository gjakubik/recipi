'use server'
import Router from 'next/router'
import { getMenuQueryString } from '@/lib/utils'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  ServerPaginationLink,
  ServerPaginationNext,
  ServerPaginationPrevious,
} from '@/components/ui/pagination'
import { Typography } from '@/components/ui/typography'
import { Separator } from '@/components/ui/separator'
import { PaginationLimitInput } from '@/components/PaginationLimitInput'
import { ListQueryParams } from '@/types'

interface ServerPaginationProps {
  mode: 'recipe' | 'menu'
  basePath: string
  page: number
  limit: number
  sort: 'asc' | 'desc' | undefined
  sortBy: 'title' | 'creationDate' | 'updatedAt' | undefined
  count: number
  getQueryString: ({ page, limit, sort, sortBy }: ListQueryParams) => string
  withPageInfo?: boolean
}

export const ServerPagination = ({
  mode,
  basePath,
  page,
  limit,
  sort,
  sortBy,
  count,
  getQueryString,
  withPageInfo,
}: ServerPaginationProps) => {
  //find if the next page and the page in 2 exist
  //if they do, display the ellipsis
  const totalPages = Math.ceil(count / limit)
  const showPreviousEllipsis = page > 1
  const showNextEllipsis = page < totalPages - 2
  const showNext = page < totalPages - 1

  return (
    <div className="w-full flex flex-col-reverse sm:flex-row justify-between gap-4 mt-4">
      {withPageInfo ? (
        <div className="flex flex-row items-center gap-4">
          <Typography variant="pn">
            {page * limit}-{Math.min(page * limit + limit, count)} of {count}
          </Typography>
          <Separator orientation="vertical" />
          <PaginationLimitInput
            limit={limit}
            page={page}
            mode={`server-${mode}`}
            basePath={basePath}
          />
        </div>
      ) : (
        <div />
      )}
      <Pagination className="w-fit mx-0">
        <PaginationContent>
          {page !== 0 && (
            <ServerPaginationPrevious
              disabled={page === 0}
              href={`${basePath}?${getQueryString({
                page: (page - 1).toString(),
                limit: limit.toString(),
                sort,
                sortBy,
              })}`}
            />
          )}

          {page !== 0 && (
            <ServerPaginationLink
              href={`${basePath}?${getQueryString({
                page: '0',
                limit: limit.toString(),
                sort,
                sortBy,
              })}`}
            >
              0
            </ServerPaginationLink>
          )}

          {showPreviousEllipsis && <PaginationEllipsis />}

          <ServerPaginationLink
            href={`${basePath}?${getQueryString({
              page: page.toString(),
              limit: limit.toString(),
              sort,
              sortBy,
            })}`}
            isActive
          >
            {page}
          </ServerPaginationLink>

          {showNextEllipsis && <PaginationEllipsis />}

          {page !== totalPages - 1 && (
            <ServerPaginationLink
              href={`${basePath}?${getQueryString({
                page: (totalPages - 1).toString(),
                limit: limit.toString(),
                sort,
                sortBy,
              })}`}
            >
              {totalPages - 1}
            </ServerPaginationLink>
          )}

          {showNext && (
            <ServerPaginationNext
              disabled={!showNext}
              href={`${basePath}?${getQueryString({
                page: (page + 1).toString(),
                limit: limit.toString(),
                sort,
                sortBy,
              })}`}
            />
          )}
        </PaginationContent>
      </Pagination>
    </div>
  )
}
