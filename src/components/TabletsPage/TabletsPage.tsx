import React, { useContext } from 'react';
import { ProductsContext } from '../../ProductsProvider';
import { PageContent } from '../PageContent';

export const TabletsPage = React.memo(() => {
  const { productsList, path } = useContext(ProductsContext);

  return (
    <PageContent title="Tablets" products={productsList[path]} />
  )
})