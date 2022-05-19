import React, { useContext } from 'react';
import { ProductsContext } from '../../ProductsProvider';
import classNames from 'classnames';
import './SelectSort.scss';

type Props = {
  list: string[],
}

export const SelectSort: React.FC<Props> = React.memo(({ list }) => {
  const {
    path,
    toggleSort,
    setToggleSort,
    sortCarts,
    setSortCarts
  } = useContext(ProductsContext);

  return (
    <div className="Select">
      <button
        className={classNames('Select-Button', {
          image_rotate: toggleSort[path],
        })}
        type="button"
        onClick={() => setToggleSort({...toggleSort, [path]: !toggleSort[path]})}
      >
        <p className="Select-Text">{sortCarts[path]}</p>
        <img
          src="./img/icons-page/down.svg"
          alt="Down"
          className="button-image"
        />
      </button>
      {toggleSort[path] && (
        <ul className={classNames('Select-List', {
        })}
        >
          {list.map(item => (
            <li
              className={classNames('Select-Item', {
                selected: item === sortCarts[path],
              })}
              key={item}
              onClick={() => {
                setSortCarts({...sortCarts, [path]: item});
                setToggleSort({...toggleSort, [path]: false});
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
