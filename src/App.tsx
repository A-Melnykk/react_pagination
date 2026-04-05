import React, { useState } from 'react';
import { Pagination } from './components/Pagination';
import './App.css';

const totalItems = 42;
const items = Array.from({ length: totalItems }, (_, i) => `Item ${i + 1}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const visibleGoods = items.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="app">
      <h1 className="title">Products Pagination</h1>

      <div className="field">
        <label className="label" htmlFor="per-page-select">
          Items per page:
        </label>
        <div className="control">
          <div className="select">
            <select
              id="per-page-select"
              data-cy="perPageSelector"
              value={perPage}
              onChange={e => {
                setPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>

      <ul className="items-list">
        {visibleGoods.map(item => (
          <li key={item} data-cy="item" className="item">
            {item}
          </li>
        ))}
      </ul>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
