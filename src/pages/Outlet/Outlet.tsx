import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductGrid from "../../components/Shop/ProductGrid";

import "./Outlet.css";

export default function Outlet() {
  return (
    <section className="outlet">
      <motion.div
        className="outlet-content"
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
      >
        <span className="outlet-tag">SAVANNA OUTLET</span>

        <h1>Outlet</h1>

        <div className="shop-links">
          <Link to="/catalogo">Catálogo completo</Link>
          <Link to="/carrito">Ver carrito</Link>
        </div>
        <ProductGrid outlet />
      </motion.div>
    </section>
  );
}
