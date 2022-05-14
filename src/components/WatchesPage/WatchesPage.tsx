import React, { useContext } from 'react';
import { ProductsContext } from '../../ProductsProvider';
import { PageContent } from '../PageContent';

export const WatchesPage = React.memo(() => {
  const { productsList, path } = useContext(ProductsContext);

  return (
    <PageContent title="Watches" products={productsList[path]} />
  )
})