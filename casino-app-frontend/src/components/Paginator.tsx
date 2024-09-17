import React from 'react'
import { Link } from 'react-router-dom'

interface PaginatorProps {
    currentPage: number
    totalPages: number
    basePath: string // Base path for navigation
}

const Paginator: React.FC<PaginatorProps> = ({
    currentPage,
    totalPages,
    basePath,
}) => {
    const pageNumbers = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    )

    return (
        <div className="paginator">
            {/*current page: {currentPage} - total pages: {totalPages}*/}
            {/* Previous Page Link */}
            {currentPage > 1 && (
                <Link
                    to={`${basePath}/page/${currentPage - 1}`}
                    className="page-link"
                >
                    Previous
                </Link>
            )}
            {/* Page Number Links */}
            {pageNumbers.map((page) => (
                <Link
                    key={page}
                    to={`${basePath}/page/${page}`}
                    className={`page-link ${page === currentPage ? 'active' : ''}`}
                >
                    {page}
                </Link>
            ))}
            {/* Next Page Link */}
            {currentPage < totalPages && (
                <Link
                    to={`${basePath}/page/${currentPage + 1}`}
                    className="page-link"
                >
                    Next
                </Link>
            )}
        </div>
    )
}

export default Paginator
