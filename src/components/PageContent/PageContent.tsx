import React, { useContext, useMemo, useEffect} from 'react';
import { ProductsContext } from '../../ProductsProvider';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { Product } from '../Product';
import { SelectSort } from '../SelectSort';
import { SelectItems } from '../SelectItems';
import { Pagination } from '../Pagination';
import { initialItemsPageSelect } from '../../helpers/select';
import { ProductCart } from '../../helpers/utils';
import './PageContent.scss';


type Props = {
  products: ProductCart[];
  title: string;
}

export const PageContent: React.FC<Props> = React.memo(({ products, title }) => {
  const {
    appliedValue,
    path,
    sortCarts,
    pageItems,
    page,
    setPageItems,
  } = useContext(ProductsContext);
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(search);

  window.addEventListener('resize', (e: Event) => {
    let target = e.target as Window;
    if (target.innerWidth <= 620) {
      setPageItems(initialItemsPageSelect);
  }})

  useEffect(() => {
    if (sortCarts[path]) {
      searchParams.set('sort',
        sortCarts[path] === 'Alphabetically'
        ? 'name': sortCarts[path] === 'Newest'
        ? 'age' : 'price');
    }

    if (!['home', 'favorites', 'cart'].includes(path)) {
      if (pageItems[path] !== 'All items') {
        searchParams.set('perPage', pageItems[path]);
        searchParams.set('page', page ? page[path] : '');
      } else {
        searchParams.delete('perPage');
        searchParams.delete('page');
      }
    }

    if (!['home', 'cart'].includes(path)) {
      if (appliedValue[path]) {
        searchParams.set('query', appliedValue[path]);
        searchParams.delete('sort');
        searchParams.delete('perPage');
        searchParams.delete('page');
      } else {
        searchParams.delete('query');
      }
    }
    navigate(`/${path}?${searchParams.toString()}`);

  }, [sortCarts[path],
      pageItems[path],
      page[path],
      appliedValue[path]
    ]
  );

  let forPage = useMemo(() => (+page[path] - 1) * +pageItems[path],
    [page[path], pageItems[path]]
  );
  let toPage = useMemo(() => +pageItems[path] * +page[path],
    [page[path], pageItems[path]]
  );

  const sortProducts = useMemo(() => {
    switch(sortCarts[path]) {
      case 'Newest':
        return [...products].sort((a, b) => (
          b.model.localeCompare(a.model)
        ));
      case 'Alphabetically':
        return [...products].sort((a, b) => (
          a.name.localeCompare(b.name)));
      case 'Cheapest':
        return [...products].sort((a, b) => (
          a.price[0] - b.price[0]));
      default:
        return products;
    }
  }, [sortCarts[path], products]);

  const visibleProducts = useMemo(() => {
    if ( appliedValue[path]) {
      return products.filter(product => product.name.toLowerCase()
      .includes(appliedValue[path].toLowerCase()))
    }

    if (!appliedValue[path]) {
      if (pageItems[path] !== "All items") {
        return sortProducts.slice(forPage, toPage);
      }
      return sortProducts;
    }

    return [];
  }, [appliedValue[path],
      sortProducts,
      products,
      pageItems[path],
      forPage,
      toPage]
  );

  return (
    <div className="PageContent">
      {!appliedValue[path] && (
        <div className="PageContent-Breadcrumbs Breadcrumbs">
          <NavLink className="Breadcrumbs-Item" to="/home">
            <img src="./img/icons-page/home.svg" alt="Home"/>
          </NavLink>
          <img
            src="./img/icons-page/next-disabled.svg"
            alt="Next"
            className="Breadcrumbs-Item"
          />
          <p className="Breadcrumbs-Item">
            {path[0].toUpperCase() + path.slice(1)}
          </p>
        </div>
      )}
      <div className="PageContent-Main">
        {!appliedValue[path] && (
          <>
            <h1 className="PageContent-Title">{title}</h1>
            <p className="PageContent-Count">
            {visibleProducts.length} items
            </p>
          </>
        )}
        {appliedValue[path] && (
          <p className="PageContent-Results">
          {visibleProducts.length} results
          </p>
        )}
        {(path === 'favorites'
          && visibleProducts.length === 0
          && !appliedValue[path]
         ) && (
          <img
            src="./img/page_gif/favorites.gif"
            className="PageContent-FavoritesGif"
            alt="Favorites"
          />
        )}
        {(appliedValue[path] && visibleProducts.length === 0) && (
          <img
            src="./img/page_gif/search.gif"
            className="PageContent-SearchGif"
            alt="Search"
            width="370px"
          />
        )}
        {(path !== 'favorites' && !appliedValue[path]) && (
          <div className="PageContent-Selects">
            <div className="PageContent-SelectsContainer">
              <p className="PageContent-SelectName">Sort by</p>
              <div className="PageContent-SelectSort">
                <SelectSort
                  list={['Alphabetically', 'Newest', 'Cheapest']}
                />
              </div>
            </div>
            <div className="PageContent-SelectsContainer PageContent-SelectsContainer_hidden">
              <p className="PageContent-SelectName">Items on page</p>
              <div className="PageContent-SelectPageItems">
                <SelectItems list={['All items', '4', '8' , '16']}/>
              </div>
            </div>
          </div>
        )}
        <ul className="PageContent-Content">
          {visibleProducts.map(product => (
            <li key={product.id}>
              <Product {...product} />
            </li>
          ))}
        </ul>
      </div>
      {(path !== 'favorites'
        && pageItems[path] !== "All items"
        && !appliedValue[path]) && (
        <Pagination />
      )}
    </div>
  )
})
