import React, { useContext } from 'react';
import './Header.scss';
import { useLocation, NavLink } from 'react-router-dom';
import { navSectionLeftItems } from '../../helpers/nav-items';
import { Search } from '../Search';
import { ProductsContext } from '../../ProductsProvider';

export const Header = React.memo(() => {
  const { carts, favorites } = useContext(ProductsContext);
  const { search } = useLocation();

  return (
    <div className="Header">
      <div className="Header-SectionLeft">
        <a className="Header-Logo Logo" href="#/home">
          <img
            className="Logo-Image"
            src="./img/icons-page/logo.svg"
            alt="Logo"
          />
        </a>
        <ul className="Header-NavListLeft NavListLeft">
          {navSectionLeftItems.map(item => (
            <li className="NavListLeft-Item" key={item}>
              <NavLink
                className="NavListLeft-LinkItem"
                to={`${item}` !== 'home' ? `/${item}${search}`: '/home'}
              >
                {item.toUpperCase()}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="Header-SectionRight">
        <Search />
        <ul className="Header-NavListRight NavListRight">
          {['favorites', 'cart'].map(item => (
            <li className="NavListRight-Item" key={item}>
               <NavLink
                  className="NavListRight-Nav"
                  to={`/${item}`}
                >
                  <div className="NavListRight-NavContent">
                    <img
                      className="NavListRight-Image"
                      src={`./img/icons-page/${item}.svg`}
                      alt="Link"
                    />
                    {(item === "favorites" && favorites.length !== 0) && (
                      <span className="NavListRight-ItemCount">{favorites.length}</span>
                    )}
                    {(item === "cart" && carts.length !== 0) && (
                      <span className="NavListRight-ItemCount">{carts.length}</span>
                    )}
                  </div>
                </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
})