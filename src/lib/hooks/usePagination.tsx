import { useState } from "react";
import { Icons } from "../../components/ui/icons";

const usePagination = ({ totalPages, data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const visisbleData = data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) || [];

  const props = { currentPage, goToPage, goToNextPage, goToPreviousPage, totalPages };

  return {
    currentPage,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    visisbleData,
    setCurrentPage,
    PaginationWithDots: () => (visisbleData.length > 0 ? <PaginationWithDots {...props} /> : <></>),
  };
};

const PaginationWithDots = ({ currentPage, goToPage, goToNextPage, goToPreviousPage, totalPages }) => {
  const renderPagination = () => {
    const pages = [];
    const visiblePages = 5;

    if (totalPages <= visiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(renderPageNumber(i));
      }
    } else {
      // Logic for handling more than 7 pages
      if (currentPage <= 4) {
        for (let i = 1; i <= visiblePages - 2; i++) {
          pages.push(renderPageNumber(i));
        }
        pages.push(renderDot());
        pages.push(renderPageNumber(totalPages));
      } else if (currentPage >= totalPages - 3) {
        pages.push(renderPageNumber(1));
        pages.push(renderDot());
        for (let i = totalPages - visiblePages + 2; i <= totalPages; i++) {
          pages.push(renderPageNumber(i));
        }
      } else {
        pages.push(renderPageNumber(1));
        pages.push(renderDot());
        pages.push(renderPageNumber(currentPage - 1));
        pages.push(renderPageNumber(currentPage));
        pages.push(renderPageNumber(currentPage + 1));
        pages.push(renderDot());
        pages.push(renderPageNumber(totalPages));
      }
    }

    return pages;
  };

  const renderPageNumber = (page) => (
    <button
      key={page}
      onClick={() => goToPage(page)}
      className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
        currentPage === page
          ? "bg-gradient-custom text-sm text-white" // Active page
          : "hover:bg-gray-400 bg-gray-200 font-advance text-xs text-grey" // Inactive page
      }`}
      aria-label={`Go to page ${page}`}
    >
      {page}
    </button>
  );

  const renderDot = () => (
    <span key="dot" className="mx-1">
      ...
    </span>
  );

  return (
    <div className="flex items-center justify-center space-x-2">
      <Icons.arrow
        onClick={() => currentPage === 1 || goToPreviousPage()}
        color="white"
        className={`${currentPage === 1 ? "cursor-not-allowed opacity-60" : "cursor-pointer"} h-4 rotate-180`}
      />

      <div className="flex items-center">{renderPagination()}</div>

      <Icons.arrow
        onClick={() => currentPage === totalPages || goToNextPage()}
        color="white"
        className={`${currentPage === totalPages ? "cursor-not-allowed opacity-60" : "cursor-pointer"} h-4`}
      />
    </div>
  );
};

export default usePagination;
