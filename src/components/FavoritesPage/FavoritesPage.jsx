import React, { useContext, useMemo } from 'react';
import { ProductsContext } from '../../ProductsProvider';
import { PageContent } from '../PageContent';
import phones from '../../data/phones.json';
import watches from '../../data/watches.json';
import tablets from '../../data/tablets.json';;

export const FavoritesPage = React.memo(() => {
  const { favorites } = useContext(ProductsContext);
  const productsFavorites = useMemo(() => (
    [...phones, ...watches, ...tablets]
      .filter(product => favorites.includes(product.id))
  ),[favorites])

  return <PageContent title="Favorites" products={productsFavorites} />
})
