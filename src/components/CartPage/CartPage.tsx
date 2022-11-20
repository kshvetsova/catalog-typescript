import React, { useContext, useEffect, useState } from 'react';
import './CartPage.scss';
import { useNavigate } from 'react-router-dom';
import { ProductCart } from '../ProductCart';
import { ProductsContext } from '../../ProductsProvider';

let cartsLocalStorage: ([] | null) = JSON.parse(
  localStorage.getItem('carts') as string
) || [];
export const CartPage = React.memo(() => {
  const navigate = useNavigate();
  const { carts, setCarts } = useContext(ProductsContext);
  const [totalPriceHidden, setTotalPriceHidden] = useState(false);

  const [totalPrice, setTotalPrice] = useState(
    cartsLocalStorage
    ? cartsLocalStorage.reduce((sum, {count, price}) => sum + (count * price), 0)
    : carts.reduce((sum, { count, price }) => sum + (count * price), 0)
  );

  const [quantity, setQuantity] = useState(
    cartsLocalStorage
      ? cartsLocalStorage
        .reduce((sum, {count}) => sum + count, 0)
      : carts.length
  );

  useEffect(() => {
    setQuantity(carts.reduce((sum, { count }) => sum + count, 0))
}, [quantity, carts]);

  useEffect(() => {
    setTotalPrice(carts
      .reduce((sum, { count, price }) => sum + (count * price), 0))
  }, [totalPrice, carts]);

  return (
    <div className="CartPage">
      <div className="CartPage-Back Back">
        <img src="./img/icons-page/prev.svg" alt="Prev"/>
        <button
          className="Back-Button"
          type="button"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
      <h1 className="CartPage-Title">Cart</h1>
      <div className="CartPage-Content">
        <ul className="CartPage-ContainerCart">
          {carts.map(item => (
            <li key={item.id}>
              <ProductCart
                {...item}
                quantity={quantity}
                setQuantity={setQuantity}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
              />
            </li>
          ))}
        </ul>
        {(totalPriceHidden && carts) && (
          <img
            src="./img/page_gif/checkout.gif"
            className="CartPage-CheckoutGif"
            alt="Checkout"
          />
        )}
        {(!totalPriceHidden && carts.length > 0) &&(
          <div className="CartPage-Total">
            <div className="CartPage-CounterPrice">${totalPrice}</div>
            <div className="CartPage-CounterItems">Total for {quantity} items</div>
            <button
              className="CartPage-Checkout"
              onClick={() => {
                setCarts([]);
                setTotalPriceHidden(true);
              }}
            >
              Checkout
            </button>
          </div>
        )}
        {(carts.length === 0 && !totalPriceHidden) && (
          <img
            src="./img/page_gif/cart.gif"
            className="CartPage-CartGif"
            alt="Cart"
          />
        )}
      </div>
    </div>
  )
})