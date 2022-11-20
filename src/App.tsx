import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PhonesPage } from './components/PhonesPage';
import { TabletsPage } from './components/TabletsPage';
import { WatchesPage } from './components/WatchesPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { FavoritesPage } from './components/FavoritesPage';
import { CartPage } from './components/CartPage';
import { Layout } from './components/Layout/Layout';

export const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate to="home" replace/>} />
      <Route path="home" element={<HomePage />} />
      <Route path="phones" element={<PhonesPage />} />
      <Route
        path=":typeProduct/product/:productId"
        element={<ProductDetailsPage />} />
      <Route path="tablets" element={<TabletsPage />} />
      <Route path="watches" element={<WatchesPage />} />
      <Route path="favorites" element={<FavoritesPage />} />
      <Route path="cart" element={<CartPage />} />
    </Route>
  </Routes>
)
