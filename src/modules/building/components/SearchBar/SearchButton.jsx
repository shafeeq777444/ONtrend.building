import React from 'react';

const SearchButton = ({
    onClick,
    children,
    className = '',
    loading = false,
    ariaLabel = 'Search',
    ...props
}) => {
    return (
        <button
            type="button"
            className={`relative bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white px-5 py-3 sm:px-6 sm:py-3 rounded-full ml-0 sm:ml-2 shadow-md hover:from-red-600 hover:to-red-800 transition-all flex items-center justify-center font-semibold text-base sm:text-base text-sm w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
            onClick={onClick}
            aria-label={ariaLabel}
            disabled={loading}
            {...props}
        >
            {/* Loading overlay */}
            {loading && (
                <span className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-full z-10">
                    <svg className="animate-spin w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                </span>
            )}
            {/* Icon and text */}
            <span className={`flex items-center gap-2 ${loading ? 'opacity-40' : ''}`}>
                {/* Magnifying glass icon */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                    <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="hidden xs:inline sm:inline">{children || 'Search'}</span>
            </span>
        </button>
    );
};

export default SearchButton; 