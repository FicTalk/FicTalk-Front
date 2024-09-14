"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  currentPage: number;
  paginationRange: number[];
  createPageUrl: (page: number) => string;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export default function Paginate({ currentPage, paginationRange, createPageUrl, isFirstPage, isLastPage }: Props) {
  return (
    <Pagination className='py-5'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageUrl(currentPage - 1)}
            aria-disabled={isFirstPage}
            tabIndex={isFirstPage ? -1 : undefined}
            className={isFirstPage ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>
        {paginationRange.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              className={
                currentPage === pageNumber
                  ? "bg-black hover:bg-black text-white"
                  : "bg-transparent hover:bg-transparent text-black/30"
              }
              href={createPageUrl(pageNumber)}
              isActive={currentPage === pageNumber}>
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href={createPageUrl(currentPage + 1)}
            aria-disabled={isLastPage}
            tabIndex={isLastPage ? -1 : undefined}
            className={isLastPage ? "pointer-events-none text-black/30" : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
