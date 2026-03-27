"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalCount: number;
  totalPages: number;
  limit: number;
}

export const Pagination = ({
  totalCount,
  totalPages,
  limit,
}: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Get current page from URL, default to 1
  const currentPage = Number(searchParams.get("page")) || 1;

  // 2. Helper to update the URL
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());

    // Logic to update offset based on page if your API needs it
    const newOffset = (Number(pageNumber) - 1) * limit;
    params.set("offset", newOffset.toString());

    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    router.push(createPageURL(page));
  };

  // 3. Logic to generate the page numbers (with ellipses ...)
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    // Simple logic for "1 2 3 ... 25" style
    if (currentPage <= 3) return [1, 2, 3, "...", totalPages];
    if (currentPage >= totalPages - 2)
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", currentPage, "...", totalPages];
  };

  const startRange = (currentPage - 1) * limit + 1;
  const endRange = Math.min(currentPage * limit, totalCount);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4  border-t border-neutral-100 rounded-md gap-4">
      {/* Result Status */}
      <p className="text-xs font-bold text-neutral-400 tracking-tight">
        Showing{" "}
        <span className="text-neutral-800">
          {startRange}-{endRange}
        </span>{" "}
        of <span className="text-neutral-800">{totalCount}</span> results
      </p>

      {/* Navigation Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-neutral-400 hover:text-neutral-800 disabled:opacity-30 transition-colors"
        >
          Previous
        </button>

        <div className="flex items-center gap-1">
          {getVisiblePages().map((page, index) => {
            const isEllipsis = page === "...";
            const isActive = page === currentPage;

            return isEllipsis ? (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-xs font-bold text-neutral-400"
              >
                ...
              </span>
            ) : (
              <button
                key={`page-${page}`}
                onClick={() => handlePageChange(page as number)}
                className={`w-9 h-9 flex items-center justify-center rounded-md text-xs font-bold transition-all ${isActive
                    ? "bg-[#585f70] text-white shadow-sm"
                    : "text-neutral-500 hover:bg-neutral-100"
                  }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-neutral-400 hover:text-neutral-800 disabled:opacity-30 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};
