'use server'
import { useRouter } from 'next/navigation'
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

interface ServerPaginationProps {
  basePath: string
  page: number
  limit: number
  sort: 'asc' | 'desc' | undefined
  sortBy: 'title' | 'creationDate' | 'updatedAt' | undefined
  count: number
}

export const ServerPagination = ({
  basePath,
  page,
  limit,
  sort,
  sortBy,
  count,
}: ServerPaginationProps) => {
  //find if the next page and the page in 2 exist
  //if they do, display the ellipsis
  const showNext = (page + 1) * limit < count
  const showEllipsis = (page + 2) * limit < count

  return (
    <div className="w-full flex flex-col-reverse sm:flex-row justify-between gap-4 mt-4">
      <div className="flex flex-row items-center gap-4">
        <Typography variant="pn">
          {page * limit}-{Math.min(page * limit + limit, count)} of {count}
        </Typography>
        <Separator orientation="vertical" />
        <Typography variant="pn">Placeholder</Typography>
      </div>
      <Pagination className="w-fit mx-0">
        <PaginationContent>
          <ServerPaginationPrevious
            disabled={page === 0}
            href={`${basePath}?${getMenuQueryString({
              page: (page - 1).toString(),
              limit: limit.toString(),
              sort,
              sortBy,
            })}`}
          />

          {page > 1 && <PaginationEllipsis />}

          {page > 0 && (
            <ServerPaginationLink
              href={`${basePath}?${getMenuQueryString({
                page: (page - 1).toString(),
                limit: limit.toString(),
                sort,
                sortBy,
              })}`}
            >
              {page - 1}
            </ServerPaginationLink>
          )}

          <ServerPaginationLink
            href={`${basePath}?${getMenuQueryString({
              page: page.toString(),
              limit: limit.toString(),
              sort,
              sortBy,
            })}`}
            isActive
          >
            {page}
          </ServerPaginationLink>

          {showNext && (
            <ServerPaginationLink
              href={`${basePath}?${getMenuQueryString({
                page: (page + 1).toString(),
                limit: limit.toString(),
                sort,
                sortBy,
              })}`}
            >
              {page + 1}
            </ServerPaginationLink>
          )}

          {showEllipsis && <PaginationEllipsis />}

          <ServerPaginationNext
            disabled={!showNext}
            href={`${basePath}?${getMenuQueryString({
              page: (page + 1).toString(),
              limit: limit.toString(),
              sort,
              sortBy,
            })}`}
          />
        </PaginationContent>
      </Pagination>
    </div>
  )
}
