import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PaginationButtons = ({
  handlePrevious,
  currentPageIndex,
  isArabic,
  handleNext,
  isNextDisabled,
  isFetchingNextPage,
}) => {
  return (
    <div className="flex justify-center items-center gap-3 mt-12 mb-6">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPageIndex === 0}
        aria-label={isArabic ? "الصفحة السابقة" : "Previous page"}
        className="group relative w-12 h-12 rounded-xl bg-gradient-to-r from-[#ff3131] to-[#ff4757] text-white hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 border-0 transition-all duration-300 ease-out flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {isArabic ? <ChevronRight size={20} className="relative z-10" /> : <ChevronLeft size={20} className="relative z-10" />}
      </button>

      {/* Page Indicator */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff3131] to-[#ff4757] rounded-2xl blur-sm opacity-20"></div>
        <span className="relative text-sm font-bold text-gray-800 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-2xl border border-gray-200/50 shadow-lg">
          {isArabic ? `صفحة ${currentPageIndex + 1}` : `Page ${currentPageIndex + 1}`}
        </span>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={isNextDisabled}
        aria-label={isArabic ? "الصفحة التالية" : "Next page"}
        className="group relative w-12 h-12 rounded-xl bg-gradient-to-r from-[#ff3131] to-[#ff4757] text-white hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 border-0 transition-all duration-300 ease-out flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {isFetchingNextPage ? (
          <div className="relative z-10">
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        ) : isArabic ? (
          <ChevronLeft size={20} className="relative z-10" />
        ) : (
          <ChevronRight size={20} className="relative z-10" />
        )}
      </button>
    </div>
  );
};

export default PaginationButtons;