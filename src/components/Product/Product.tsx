import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { Buttons } from '../Buttons';
import { ProductsContext } from '../../ProductsProvider';
import { ProductCart } from '../../helpers/utils';
import classNames from 'classnames';
import './Product.scss';


export const Product = React.memo(({
  images,
  name,
  price,
  tech,
  id,
  type,
  option
}: ProductCart) => {
  const { path } = useContext(ProductsContext);

  return (
    <div className="Product">
      <NavLink
        className="Product-ImageContainer"
        to={path.includes(`/${type}/product`)
          ? `/${id}`
          : `/${type}/product/${id}`}
      >
        <img
          className={classNames('Product-Image', {
            watches_image: option === "40mm",
          })}
          src={`./${images[0]}`}
          alt="Iphone"
          width="190px"
        />
      </NavLink>
      <div className="Product-Info">
        <p className="Product-Name">
          {name}
        </p>
        <div className="Product-PriceBlock PriceBlock">
          <div className="PriceBlock-Price">{`$${price[0]}`}</div>
          <div className="PriceBlock-Sale">
            {price[1] ? `$${price[1]}` : ''}
          </div>
        </div>
        <div className="line">{}</div>
        <ul className="Product-Details Details">
          {tech.map(([name, value]) => (
            <li className="Details-Item" key={name}>
              <p className="Details-Name">{name}</p>
              <p className="Details-Value">{value}</p>
            </li>
          ))}
        </ul>
      </div>
      <Buttons
        id={id}
        price={price[0]}
        name={name}
        image={images[0]}
      />
    </div>
  );
})
