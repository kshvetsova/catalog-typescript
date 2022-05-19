import React, {useEffect, useState, useMemo, useCallback, useContext } from 'react';
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import details from '../../data/details.json';
import classNames from 'classnames';
import { Buttons } from '../Buttons';
import { ProductsSlider } from '../ProductsSlider';
import { ProductsContext } from '../../ProductsProvider';
import { ProductCart } from '../../helpers/utils';
import './ProductDetailsPage.scss';

export const ProductDetailsPage = React.memo(() => {
  const { productsList } = useContext(ProductsContext);
  const { productId = '', typeProduct = '' } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Partial<ProductCart>>(
    productsList[typeProduct].find(item => item.id === +productId) || {}
  );
  const [image, setImage] = useState('');
  const [imageHover, setImageHover] = useState('');
  const [colorList, setColorList] = useState([['']]);
  const [optionList, setOptionList] = useState(['']);
  const {
    name = '',
    images = [],
    model = '',
    color = '',
    id = 0,
    type = '',
    option = '',
    price = [],
    tech = []
  } = product;

  useEffect(() => {
    setProduct(productsList[typeProduct]
      .find(item => item.id === +productId) || {});
  }, [productId, typeProduct]);

  useEffect(() => {
    setImage(images[0] || '')
    if (product) {
      const productItem = details.find(item => item.models === model);
      setColorList(productItem ? productItem.colors : [['']]);
      setOptionList(productItem ? productItem.options : ['']);
    }
  }, [productId, typeProduct, product]);

  const findProductColor = useCallback(colorItem => {
    const productItem = productsList[typeProduct].find(item => (
      item.color === colorItem &&
      item.type === typeProduct &&
      item.option === option &&
      item.model === model));
      return productItem ? productItem.id : 0;
  }, [productId, product]);

  const findProductOption = useCallback((optionItem) => {
    const productItem = productsList[typeProduct].find(item => (
      item.color === color &&
      item.type === typeProduct &&
      item.option === optionItem &&
      item.model === model));
    return productItem ? productItem.id : 0;
  }, [productId, product]);

  const detailsProduct = useMemo(() => {
    const productItem = [...details]
      .find(item => item.models === model && item.type === type);

    return {
      description: productItem? productItem.about : [],
      techSpecsList: productItem? productItem.specs : [],
    }
  }, [product]);

  const productsSlider = useMemo(() => [...productsList[typeProduct]]
    .filter(item => item.id !== +productId)
  , [productId]);

  return (
    <div className="ProductDetailsPage">
      <div className="ProductDetailsPage-Breadcrumbs Breadcrumbs">
        <div className="Breadcrumbs-List">
          <NavLink className="Breadcrumbs-Item" to="/home">
            <img src="./img/icons-page/home.svg" alt="Home"/>
          </NavLink>
          <img
            src="./img/icons-page/next-disabled.svg"
            alt="Next"
            className="Breadcrumbs-Item"
          />
          <button
            className="Breadcrumbs-Item"
            onClick={() => navigate(`/${type}`)}
            type="button"
          >
            {type[0].toUpperCase() + type.slice(1)}
          </button>
          <img src="./img/icons-page/next-disabled.svg" alt="Next" className="Breadcrumbs-Item"/>
          <p className="Breadcrumbs-Item">{name}</p>
        </div>
        <div className="Breadcrumbs-Back Back">
          <img src="./img/icons-page/prev.svg" alt="Prev"/>
          <button
            className="Back-Button"
            type="button"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
      <h1 className="ProductDetailsPage-Title">{product.name}</h1>
      <div className="ProductDetailsPage-ContainerTop">
        <div className="ProductDetailsPage-BlockImages BlockImages">
          <ul className="BlockImages-List">
            { product.images && (product.images.map((item, index) => (
              <li
                key={index}
                className={classNames('BlockImages-Item', {
                  item_active: item === image,
                  item_size: ["11 Pro", "Air 4", "Pro 12.9\"", "Pro 12.9\" M1"].includes(model) || typeProduct === "watches",
                  item_tablets: ["Pro 11\"", "8 10.2\""].includes(model),
                })}
                onClick={() => setImage(item)}
                onMouseEnter={() => setImageHover(item)}
                onMouseLeave={() => setImageHover('')}
              >
                <img
                  src={`./${item}`}
                  alt="Product"
                  width="64px"
                  height="64px"
                  className="imageItem"
                />
              </li>
            )))}
          </ul>
          <img
            src={imageHover ? `./${imageHover}` : `./${image}`}
            alt="Product"
            width="200px"
            height="200px"
            className="BlockImages-Preview"
          />
        </div>
        <div className="ProductDetailsPage-ContainerOptions">
          <div className="ProductDetailsPage-BlockOptions BlockOptions">
            <div className="BlockOptions-Colors Colors">
              <h3 className="Colors-Title">Available colors</h3>
              <ul className="Colors-List">
                {colorList.map(([item, hex ]) => (
                  <li
                    key={hex}
                    className={classNames('Colors-Item', {
                      color_active: item === color,
                    })}
                    onClick={() => navigate(
                      `/${type}/product/${findProductColor(item)}`
                    )}
                  >
                    <div
                      className="color"
                      style={{
                        background: `${hex}`,
                        border: `${1}px solid ${hex}`
                      }}
                    >{}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="BlockOptions-Options Options">
              <h3 className="Options-Title">
                Select {`${typeProduct !== 'watches' ? 'capacity' : 'size'}`}
              </h3>
              <ul className="Options-List">
                {optionList.map(item => (
                  <li
                    key={item}
                    className={classNames('Options-Item', {
                      option_active: item === option,
                    })}
                    onClick={() => navigate(
                      `/${type}/product/${findProductOption(item)}`
                    )}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="BlockOptions-PriceBlock PriceBlock">
              <div className="PriceBlock-Price price">
                {`$${price[0]}`}
              </div>
              <div className="PriceBlock-Sale">
                {price[1] ? `$${price[1]}` : ''}
              </div>
            </div>
            <div className="BlockOptions-Buttons BlockOptions-Buttons_gap">
              <Buttons
                id={id}
                name={name}
                price={price[0]}
                image={`./${images[0]}`}
              />
            </div>
            <ul className="BlockOptions-Details Details">
              {tech.map(([name, value]) => (
                <li className="Details-Item" key={value}>
                  <p className="Details-Name">{name}</p>
                  <p className="Details-Value">{value}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="ProductDetailsPage-ProductId">ID: {id}</div>
        </div>
      </div>
      <div className="ProductDetailsPage-ContainerBottom">
        <div className="ProductDetailsPage-About About">
          <h2 className="About-Title">About</h2>
          <ul className="About-List">
            {detailsProduct.description.map(([title, text]) => (
               <li className="About-Item" key={title}>
                 <h3 className="About-ItemTitle">{title}</h3>
                 <p className="About-ItemText">{text}</p>
               </li>
            ))}
          </ul>
        </div>
        <div className="ProductDetailsPage-TechSpecs TechSpecs">
          <h2 className="TechSpecs-Title">Tech specs</h2>
          <ul className="TechSpecs-List">
            {detailsProduct.techSpecsList.map(([name, value]) => (
               <li className="TechSpecs-Item" key={value}>
                 <h3 className="TechSpecs-Name">{name}</h3>
                 <p className="TechSpecs-Value">{value}</p>
               </li>
            ))}
          </ul>
        </div>
      </div>
      <ProductsSlider title="You may also like" products={productsSlider} />
    </div>
  )
})