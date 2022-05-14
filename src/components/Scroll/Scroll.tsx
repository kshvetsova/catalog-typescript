import './Scroll.scss';

export const Scroll = () => (
  <button className="Scroll" onClick={() => window.scrollTo(0, 0)}>
    <img
      src="./img/icons-page/scroll-small.svg"
      alt="Scroll"
    />
  </button>
)


