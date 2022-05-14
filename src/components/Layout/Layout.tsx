import { Outlet } from 'react-router-dom';
import { ProductsProvider } from '../../ProductsProvider';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Scroll } from '../Scroll';
import './Layout.scss';

export const Layout = () => (
  <div className="Layout">
    <ProductsProvider>
      <Header />
      <div className="Layout-Main">
        <Outlet/>
      </div>
    </ProductsProvider>
    <Scroll />
    <Footer />
  </div>
)