import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

interface UsePaginationProps {
  totalPages: number;
  maxVisiblePages?: number;
}

export function usePagination({ totalPages, maxVisiblePages = 5 }: UsePaginationProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  const paginationRange = useMemo(() => {
    let startPage: number, endPage: number;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= Math.floor(maxVisiblePages / 2) + 1) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + Math.floor(maxVisiblePages / 2) >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(maxVisiblePages / 2);
        endPage = currentPage + Math.floor(maxVisiblePages / 2);
      }
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }, [currentPage, totalPages, maxVisiblePages]);

  return {
    currentPage,
    totalPages,
    paginationRange,
    createPageUrl,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
  };
}
