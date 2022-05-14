import React, { useContext, useCallback } from 'react';
import './ProductCart.scss';
import { ProductsContext } from '../../ProductsProvider';
import { Item } from '../../helpers/utils';

interface Cart extends Item {
  quantity: number;
  setQuantity: React.Dispatch<any>;
  setTotalPrice: React.Dispatch<any>;
  totalPrice: number;
};

export const ProductCart = React.memo(({
  name,
  price,
  image,
  id,
  count,
  quantity,
  setQuantity,
  setTotalPrice,
  totalPrice,
  }: Cart) => {
  const {carts, setCarts} = useContext(ProductsContext);

  const addCountCart = useCallback((id) => setCarts(
    carts.map((item: {id: number, count: number}) => (item.id === id)
    ? { ...item, count: item.count + 1}
    : item)), [carts]);

  const removeCountCart = useCallback((id) => setCarts(
    carts.map((item: {id: number, count: number}) => (item.id === id)
    ? { ...item, count: item.count - 1}
    : item)), [carts]);

  return (
    <div className="ProductCart">
      <div className="ProductCart-ContainerLeft">
        <button
          className="ProductCart-Close"
          onClick={() => setCarts(carts.filter((item: Item) => item.id !== id))}
        >
          {}
        </button>
        <img
          className="ProductCart-Image"
          src={image}
          width="66px"
          height="66px"
          alt="Phone"
        />
        <p className="ProductCart-Name">{name}</p>
      </div>
      <div className="ProductCart-ContainerRight">
        <div className="ProductCart-ContainerQuantity">
          <button
            className="ProductCart-Remove buttonProduct"
            onClick={() => {
              removeCountCart(id);
              setQuantity(quantity - 1);
              setTotalPrice(totalPrice - price);
            }}
            disabled={(count === 1)}
          >{}</button>
          <div className="ProductCart-Quantity">{count}</div>
          <button
            className="ProductCart-Add buttonProduct"
            onClick={() => {
              addCountCart(id);
              setQuantity(quantity + 1);
              setTotalPrice(totalPrice + price);
              }}
          >
            {}
          </button>
        </div>
        <div className="ProductCart-Price">${price}</div>
      </div>
    </div>
  )
})
