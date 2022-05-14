import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import category from '../../data/category.json';
import { ProductsContext } from '../../ProductsProvider';
import './Category.scss';

export const Category = React.memo(() => {
  const { productsList } = useContext(ProductsContext);

  return (
    <div className="Category">
      <h1 className="Category-Title">Shop by category</h1>
      <ul className="Category-List">
        {category.map(({title, type, image}) => (
          <li className="Category-Item" key={title}>
            <NavLink className="Category-Image" to={`/${type}`}>
              <img
                className="category-image"
                src={image}
                alt="Category"
              />
            </NavLink>
            <div className="Category-Model">
              <h3 className="Category-ItemTitle">{title}</h3>
              <p className="Category-CountModel">
                {productsList[type].length} models
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
})
