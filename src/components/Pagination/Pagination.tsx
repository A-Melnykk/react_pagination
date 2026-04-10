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

  const from = total === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, total);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      {/* Критично важливий рядок для тестів */}
      <p data-cy="info">
        {`Page ${currentPage} (items ${from} - ${to} of ${total})`}
      </p>

      <ul className="pagination-list">
        {/* Кнопка "Назад" */}
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

        {/* Список сторінок */}
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

        {/* Кнопка "Вперед" */}
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
