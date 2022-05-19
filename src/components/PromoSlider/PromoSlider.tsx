import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { initialImages } from '../../helpers/initial-images';
import './PromoSlider.scss';

export const PromoSlider = React.memo(() => {
  const [images, setImages] = useState([...initialImages]);
  const [imageWidth, setImageWidth] = useState(
    Math.ceil(window.innerWidth * 72.2 /100)
  );
  const [currentPosition, setCurrentPosition] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  const handleResize = () => {
    setImageWidth(Math.ceil(window.innerWidth * 72.2 /100))
  };

  const handleClickNext = () => {
    window.addEventListener('resize', handleResize);
    let position = currentPosition - imageWidth;
    setImages([...images.slice(1), ...images.splice(0, 1)]);
    setCurrentPosition(position);
    setCurrentImage(currentImage < 5 ? currentImage + 1 : 0);
  };

  const handleClickPrev = () => {
    window.addEventListener('resize', handleResize);
    let position = currentPosition + imageWidth;
    setImages([...images.splice(-1), ...images]);
    setCurrentPosition(position);
    setCurrentImage(currentImage === 0 ? 5 : currentImage - 1);
  };

  useEffect(() => {
    const intervalId = setInterval(() => handleClickNext(), 5000);

    return () => {
        clearInterval(intervalId);
      }
  });

  return (
    <div className="PromoSlider">
      <div className="PromoSlider-Block">
        <button
          className="PromoSlider-Button"
          onClick={handleClickPrev}
        >
          <img src="./img/icons-page/prev.svg" alt="Prev"/>
        </button>
        <div className="PromoSlider-Container">
          <ul
            className="PromoSlider-List"
            style={{
              transition: `transform ${500}ms`,
              transform: `translateX(${currentPosition}px)`,
              marginLeft: `${currentPosition ?
                -(currentPosition+imageWidth)
                : 0}px`,
            }}
          >
            {images.map(image => (
              <li className="PromoSlider-Item" key={image}>
                <img
                  src={image}
                  alt={image}
                  className="image"
                />
              </li>
            ))}
          </ul>
        </div>
        <button className="PromoSlider-Button" onClick={handleClickNext}>
          <img src="./img/icons-page/next.svg" alt="Next"/>
        </button>
      </div>
      <div className="PromoSlider-BlockButtons">
        {[...initialImages].map((_, index) => (
          <button
            key={index + 1}
            type="button"
            className={classNames("PromoSlider-SliderButton", {
              button_active: index === currentImage,
            })}
          >
            {}
          </button>
        ))}
      </div>
    </div>
  )
})
