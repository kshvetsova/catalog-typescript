import React, { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import phones from './data/phones.json';
import watches from './data/watches.json';
import tablets from './data/tablets.json';
import { debounce } from './helpers/debounce';
import { initialValue } from './helpers/search';
import {
  initialSortSelect,
  initialToggleSelect,
  initialItemsPageSelect } from './helpers/select';
import { initialPage } from './helpers/pagination';
import { Product, ProductCart } from './helpers/utils';
import { useLocalStorage } from './helpers/useLocalStorage';

const root = document.getElementById('root') as HTMLElement;

type Props = {
  [key: string]: any,
  carts: Product[],
  favorites: (number | undefined)[],
  productsList: {[key: string]: ProductCart[]},
  path: string,
}

export const ProductsContext = React.createContext<Props>({
  carts: [],
  favorites: [],
  productsList: {},
  path: '',
});

type Children = {
  children: React.ReactNode;
}

export const ProductsProvider: React.FC<Children> = ({ children }) => {
  const [productsList] = useState({ phones, tablets, watches });
  const [appliedValue, setAppliedValue] = useState(initialValue);
  const applyValue = useMemo(() => debounce(setAppliedValue, 1000), []);
  const [sortCarts, setSortCarts] = useState(initialSortSelect);
  const [toggleSort, setToggleSort] = useState(initialToggleSelect);
  const [pageItems, setPageItems] = useState<any | {}>(initialItemsPageSelect)
  const [toggleItemsPage, setToggleItemsPage] = useState(initialToggleSelect);
  const [page, setPage] = useState(initialPage);
  const { pathname } = useLocation();
  const path = pathname.slice(1);
  const [favorites, setFavorites] = useLocalStorage('favorites', [])
  const [carts, setCarts] = useLocalStorage('carts', []);

  useEffect(() => root.scrollIntoView(), [path]);

  window.addEventListener('beforeunload', () => {
    setCarts(carts);
    setFavorites(favorites);
  });

  const contextValue = useMemo(() => (
    {
      favorites,
      setFavorites,
      carts,
      setCarts,
      productsList,
      appliedValue,
      setAppliedValue,
      applyValue,
      path,
      sortCarts,
      setSortCarts,
      toggleSort,
      setToggleSort,
      pageItems,
      setPageItems,
      toggleItemsPage,
      setToggleItemsPage,
      setPage,
      page,
  }),
    [ favorites, carts, productsList, appliedValue,
      applyValue, path, sortCarts, toggleSort,
      pageItems, toggleItemsPage, page
    ]
  );

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  )
}

