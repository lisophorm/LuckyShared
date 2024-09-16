import React from 'react'

interface PaginatorProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

const Paginator: React.FC<PaginatorProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    // Create an array of page numbers for rendering pagination buttons
    const pageNumbers = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    )

    return (
        <div className="paginator">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {/* Page Numbers */}
            {pageNumbers.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    disabled={page === currentPage}
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    )
}

export default Paginator
