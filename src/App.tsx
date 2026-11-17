import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import { CartProvider } from "./features/cart/CartContext";
import Catalog from "./pages/Catalog/Catalog";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import Outlet from "./pages/Outlet/Outlet";
import Room from "./pages/Room/Room";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/outlet" element={<Outlet />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/estancias/:slug" element={<Room />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
