'use client'
import useMenuParams from '@/app/store/useMenuParams'
import { getMenuQueryString } from '@/lib/utils'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  ClientPaginationButton,
  ClientPaginationNext,
  ClientPaginationPrevious,
} from '@/components/ui/pagination'
import { Typography } from '@/components/ui/typography'
import { Separator } from '@/components/ui/separator'

interface ClientPaginationProps {
  page: number
  limit: number
  sort: 'asc' | 'desc' | undefined
  sortBy: 'title' | 'creationDate' | 'updatedAt' | undefined
  setPage: (page: number) => void
  count: number
}

export const ClientPagination = ({
  page,
  limit,
  sort,
  sortBy,
  setPage,
  count,
}: ClientPaginationProps) => {
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
          <ClientPaginationPrevious
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          />

          {page > 1 && <PaginationEllipsis />}

          {page > 0 && (
            <ClientPaginationButton onClick={() => setPage(page - 1)}>
              {page - 1}
            </ClientPaginationButton>
          )}

          <ClientPaginationButton onClick={() => setPage(page)} isActive>
            {page}
          </ClientPaginationButton>

          {showNext && (
            <ClientPaginationButton onClick={() => setPage(page + 1)}>
              {page + 1}
            </ClientPaginationButton>
          )}

          {showEllipsis && <PaginationEllipsis />}

          <ClientPaginationNext
            disabled={!showNext}
            onClick={() => setPage(page + 1)}
          />
        </PaginationContent>
      </Pagination>
    </div>
  )
}