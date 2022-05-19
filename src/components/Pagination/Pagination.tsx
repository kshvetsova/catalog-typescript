import React, { useContext, useMemo } from 'react';
import { ProductsContext } from '../../ProductsProvider';
import classNames from 'classnames';
import './Pagination.scss';

export const Pagination = React.memo(() => {
  const {
    productsList,
    pageItems,
    page,
    setPage,
    path,
  } = useContext(ProductsContext);

  const lastPage = useMemo(() => (
    Math.ceil(productsList[path].length / +pageItems[path])),
    [productsList[path], pageItems[path]]
  );

  const list = useMemo(() => {
    let arr = Array(lastPage);
    let arrList: any = arr.keys();
    return [...arrList];
  }, [lastPage])

  return (
    <div className="Pagination">
      <button
        type="button"
        className={classNames('Pagination-Button Pagination-Button_prev', {
          disabled_prev: +page[path] === 1
        })}
        disabled={+page[path] === 1}
        onClick={() => {
          setPage({...page, [path]: +page[path] - 1});
        }}
      >
        {}
      </button>
      <ul className="Pagination-List">
        {list.map(val => val + 1)
          .map((item , index) => (
            <li
              className={classNames('Pagination-Item', {
                active_item: item === page[path],
              })}
              key={`${index + 1}`}
              onClick={() => {
                setPage({...page, [path]: item});
              }}
            >
              {item}
            </li>
        ))}
      </ul>
      <button
        type="button"
        className={classNames('Pagination-Button Pagination-Button_next', {
          disabled_next: +page[path] === lastPage
        })}
        disabled={+page[path] === lastPage}
        onClick={() => {
          setPage({...page, [path]: +page[path] + 1});
        }}
      >
        {}
      </button>
    </div>
  );
})