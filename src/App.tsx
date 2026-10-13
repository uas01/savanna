import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Outlet from "./pages/Outlet/Outlet";
import Cart from "./pages/Cart/Cart";
import Room from "./pages/Room/Room";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/outlet"
          element={<Outlet />}
        />

        <Route
          path="/carrito"
          element={<Cart />}
        />

        <Route
  path="/estancias/:slug"
  element={<Room />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;