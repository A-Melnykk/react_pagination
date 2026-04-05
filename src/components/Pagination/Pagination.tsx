import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const from = total === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, total);

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
            data-cy="prevLink" // <--- ОБОВ'ЯЗКОВО
            className="pagination-link"
            href="#prev"
            onClick={e => {
              e.preventDefault();
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
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
                onPageChange(page);
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
            onClick={e => {
              e.preventDefault();
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    </nav>
  );
};
