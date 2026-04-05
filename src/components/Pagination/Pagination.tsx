import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  // Логіка для "items 1 - 5 of 42"
  const from = total === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, total);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      onPageChange(newPage);
    }
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <p data-cy="info">
        {`Page ${currentPage} (items ${from} - ${to} of ${total})`}
      </p>

      <ul className="pagination-list">
        <li
          className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}
        >
          <a
            data-cy="prevLink"
            className="pagination-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={e => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
          >
            «
          </a>
        </li>

        {pages.map(page => (
          <li
            key={page}
            className={`pagination-item ${page === currentPage ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="pagination-link"
              href={`#${page}`}
              onClick={e => {
                e.preventDefault();
                handlePageChange(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={`pagination-item ${currentPage === totalPages ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="pagination-link"
            href="#next"
            aria-disabled={currentPage === totalPages}
            onClick={e => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
          >
            »
          </a>
        </li>
      </ul>
    </nav>
  );
};
