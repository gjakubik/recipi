'use client'

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
import { PaginationLimitInput } from '@/components/PaginationLimitInput'

interface ClientPaginationProps {
  page: number
  limit: number
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  count: number
}

export const ClientPagination = ({
  page,
  limit,
  setPage,
  setLimit,
  count,
}: ClientPaginationProps) => {
  const totalPages = Math.ceil(count / limit)
  const showPreviousEllipsis = page > 1
  const showNextEllipsis = page < totalPages - 2
  const showNext = page < totalPages - 1

  return (
    <div className="w-full flex flex-col-reverse sm:flex-row justify-between gap-4 mt-4">
      <div className="flex flex-row items-center gap-4">
        <Typography variant="pn">
          {page * limit}-{Math.min(page * limit + limit, count)} of {count}
        </Typography>
        <Separator orientation="vertical" />
        <PaginationLimitInput
          page={page}
          limit={limit}
          mode="client"
          setLimit={setLimit}
        />
      </div>
      <Pagination className="w-fit mx-0">
        <PaginationContent>
          <ClientPaginationPrevious
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          />

          {/* First page */}
          {page !== 0 && (
            <ClientPaginationButton onClick={() => setPage(0)}>
              0
            </ClientPaginationButton>
          )}

          {/* Ellipsis after first page */}
          {showPreviousEllipsis && <PaginationEllipsis />}

          {/* Current and adjacent pages */}
          <ClientPaginationButton onClick={() => setPage(page)} isActive>
            {page}
          </ClientPaginationButton>

          {/* Ellipsis before last page */}
          {showNextEllipsis && <PaginationEllipsis />}

          {/* Last page */}
          {page !== totalPages - 1 && (
            <ClientPaginationButton onClick={() => setPage(totalPages - 1)}>
              {totalPages - 1}
            </ClientPaginationButton>
          )}

          <ClientPaginationNext
            disabled={!showNext}
            onClick={() => setPage(page + 1)}
          />
        </PaginationContent>
      </Pagination>
    </div>
  )
}
