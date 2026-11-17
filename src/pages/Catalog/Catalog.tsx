import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductGrid from "../../components/Shop/ProductGrid";
import "../Cart/Cart.css";

export default function Catalog() {
  return (
    <section className="cart-page">
      <motion.div
        className="cart-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="cart-tag">SAVANNA</span>
        <h1>Catálogo</h1>
        <div className="shop-links">
          <Link to="/carrito">Ver carrito</Link>
        </div>
        <ProductGrid />
      </motion.div>
    </section>
  );
}
