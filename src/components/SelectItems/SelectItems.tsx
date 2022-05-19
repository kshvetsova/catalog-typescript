import React, { useContext } from 'react';
import classNames from 'classnames';
import { ProductsContext } from '../../ProductsProvider';

type Props = {
  list: string[];
}

export const SelectItems: React.FC<Props> = React.memo(({ list }) => {
  const {
    path,
    setPage,
    page,
    toggleItemsPage,
    setToggleItemsPage,
    pageItems,
    setPageItems,
  } = useContext(ProductsContext);

  return (
    <div className="Select">
      <button
        className={classNames('Select-Button', {
          image_rotate: toggleItemsPage[path],
        })}
        type="button"
        onClick={() => setToggleItemsPage({
          ...toggleItemsPage,
          [path]: !toggleItemsPage[path],
        })}
      >
        <p className="Select-Text">{pageItems[path]}</p>
        <img
          src="./img/icons-page/down.svg"
          alt="Down"
          className="button-image"
        />
      </button>
      {toggleItemsPage[path] && (
        <ul className={classNames('Select-List', {
        })}
        >
          {list.map(item => (
            <li
              className={classNames('Select-Item', {
                selected: item === pageItems[path],
              })}
              key={item}
              onClick={() => {
                setPageItems({...pageItems, [path]: item});
                setToggleItemsPage({...toggleItemsPage, [path]: false});
                if (item !== pageItems[path]) {
                  setPage({...page, [path]: 1});
                }
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
