import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from './components/Pagination';
import './App.css';

const items = Array.from({ length: 42 }, (_, i) => `Item ${i + 1}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 5;

  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const visibleGoods = items.slice(indexOfFirstItem, indexOfLastItem);

  const updateParams = (params: { page?: string; perPage?: string }) => {
    const newParams = new URLSearchParams(searchParams);

    if (params.perPage) {
      newParams.set('perPage', params.perPage);
      newParams.set('page', '1');
    } else if (params.page) {
      newParams.set('page', params.page);
    }

    setSearchParams(newParams);
  };

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
              onChange={e => updateParams({ perPage: e.target.value })}
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
        onPageChange={page => updateParams({ page: page.toString() })}
      />
    </div>
  );
};
