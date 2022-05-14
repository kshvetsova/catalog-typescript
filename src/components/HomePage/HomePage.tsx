import React, { useMemo } from 'react';
import { PromoSlider } from '../PromoSlider';
import { ProductsSlider } from '../ProductsSlider';
import { Category } from '../Category';
import phones from '../../data/phones.json';
import watches from '../../data/watches.json';


export const HomePage = React.memo(() => {
  const title = ['Hot prices', 'Brand new models'];
  const hotProductList = useMemo(() => (
    [...phones]
      .filter(cart => cart.price.length > 1)
      .sort((a, b) => a.price[0] - b.price[0])
  ), []);
  const newProductList = useMemo(() => (
    [...watches]
      .filter(cart => cart.price.length === 1)
      .sort((a, b) => b.price[0] - a.price[0])
  ), [])

  return (
    <div className="HomePage">
      <PromoSlider />
      <ProductsSlider title={title[0]} products={hotProductList}/>
      <Category />
      <ProductsSlider title={title[1]} products={newProductList}/>
    </div>
  )
})