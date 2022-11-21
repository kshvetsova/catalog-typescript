import React, { useContext } from 'react';
import { ProductsContext } from '../../ProductsProvider';
import { Product } from '../../helpers/utils';
import './Buttons.scss';

export const Buttons: React.FC<Partial<Product>> = React.memo(({
  id,
  price,
  name,
  image
}) => {
  const {
    carts,
    setCarts,
    favorites,
    setFavorites
  } = useContext(ProductsContext);

  return (
    <div className="Buttons">
      {!carts.find(item => item.id === id) ? (
        <button
          type="button"
          className="Buttons-ButtonAdd"
          onClick={() => {setCarts([
             ...carts,
             {id, price, name, image, count: 1},
          ])}}
        >
          Add to cart
        </button>
      ) : (
        <button
          type="button"
          className="Buttons-ButtonAdded"
        >
          Added to cart
        </button>
      )}
      {!favorites.includes(id) ? (
        <button
        type="button"
        className="Buttons-ButtonFavorites"
        onClick={() => setFavorites([ ...favorites, id ])}
      >
        <img src="./img/icons-page/favorites.svg" alt="Favorites"/>
      </button>
      ) : (
        <button
          type="button"
          className="Buttons-ButtonFavorites Buttons-ButtonFavorites_selected"
          onClick={() => setFavorites(favorites.filter(item => item !== id))}
        >
          <img src="./img/icons-page/favorites-selected.svg" alt="Favorites"/>
        </button>
      )}
    </div>
  )
})
