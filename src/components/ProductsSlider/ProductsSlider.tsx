import React , { useState } from 'react';
import { getSliderWidth , getCartLength, getMargin, getMarginLeft} from '../../helpers/slider';
import { Product } from '../Product';
import { ProductCart } from '../../helpers/utils';
import './ProductsSlider.scss';

type Props = {
  title: string;
  products: ProductCart[];
}

export const ProductsSlider: React.FC<Props> = React.memo(({ title, products }) => {
  const [sliderWidth, setSliderWidth] = useState(getSliderWidth())
  const [currentPosition, setCurrentPosition] = useState(0);
  const [cartLength, setCartLength] = useState(getCartLength());
  const [margin, setMargin] = useState(getMargin());
  const [marginLeft, setMarginLeft] = useState(getMarginLeft());
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleResize = () => {
      setSliderWidth(getSliderWidth());
      setCartLength(getCartLength());
      setMargin(getMargin());
      setMarginLeft(getMarginLeft())
    };
  window.addEventListener('resize', handleResize);

  const handleClickPrev = () => {
    window.addEventListener('resize', handleResize);
    let position = currentPosition + (cartLength ===1
      ? sliderWidth - (marginLeft / 2)
      : sliderWidth + margin);

    if (position > 0) {
      position = 0;
    } else {
      setButtonDisabled(false);
    }
    setCurrentPosition(position);
  };

  const handleClickNext = () => {
    window.addEventListener('resize', handleResize);
    let position = currentPosition - (cartLength === 1 ?
      (sliderWidth - (marginLeft / 2)) : (sliderWidth + margin));
    let maxPosition = ((products.length - cartLength) / cartLength) *
      (cartLength === 1
        ? sliderWidth - marginLeft / 2
        : sliderWidth + margin);

    if (-(position) >= maxPosition) {
      position = -maxPosition;
      setButtonDisabled(true);
    }

    setCurrentPosition(position);
  };

  return (
    <>
      <div className="ProductsSlider">
        <div className="ProductsSlider-Container">
          <p className="ProductsSlider-Title">{title}</p>
          <div className="ProductsSlider-ButtonsBlock ButtonsBlock">
            <button
              className="ButtonsBlock-Slider ButtonsBlock-Slider_prev"
              onClick={handleClickPrev}
              disabled={!currentPosition}
            >
              {}
            </button>
            <button
              className="ButtonsBlock-Slider ButtonsBlock-Slider_next"
              onClick={handleClickNext}
              disabled={buttonDisabled}
            >
              {}
            </button>
          </div>
        </div>
        <div className="ProductsSlider-Slider">
          <div
            className="ProductsSlider-Content"
            style={{
              transition: `transform ${1000}ms`,
              transform: `translateX(${currentPosition}px)`,
              marginLeft: `-${(currentPosition + sliderWidth)}`
            }}
          >
            {products.map(product => (
              <ul
                className="ProductsSlider-Product"
                style={{
                  marginRight: `${sliderWidth < 555 ? 0 : margin}px`,
                  marginLeft: `${sliderWidth < 555 ? marginLeft / 2 : 0}px`
                }}
              >
                <li key={product.id}>
                  <Product {...product}/>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </>
  )
})

