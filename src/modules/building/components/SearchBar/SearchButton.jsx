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
            className={`bg-onRed text-white p-4 rounded-full ml-2 hover:bg-[#E31C5F] transition-colors flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
            onClick={onClick}
            aria-label={ariaLabel}
            disabled={loading}
            {...props}
        >
            {loading ? (
                <svg className="animate-spin w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
            ) : null}
            {children || (
                <>
                    SEARCH

                </>
            )}
        </button>
    );
};

export default SearchButton; 