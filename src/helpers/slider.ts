export const getSliderWidth = () => (
  window.innerWidth >= 555
  ? Math.ceil((window.innerWidth * 72.2)/100 + 96)
  : (window.innerWidth - 48)
)


export const getCartLength = () => {
  let cartWidth = 272;
  let width = getSliderWidth() ;
  return Math.trunc(width / cartWidth);
}

export const getMargin = () => {
  let cartWidth = 272;
  let width = getSliderWidth();
  let cartLength = getCartLength();
  return Math.trunc((width - (cartWidth * cartLength)) / (cartLength - 1))
}

export const getMarginLeft = () => {
  let cartWidth = 272;
  let width = getSliderWidth();
  let cartLength = getCartLength();
  return cartLength === 1 ? Math.trunc(width - cartWidth) : 0;
}