import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import "./Cart.css";

export default function Cart() {
  const navigate = useNavigate();

  return (
    <section className="cart-page">
      <button
        type="button"
        className="back-button-top"
        onClick={() => navigate("/")}
      >
        ← Volver a Savanna
      </button>

      <motion.div
        className="cart-content"
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
        <span className="cart-tag">
          SAVANNA
        </span>

        <h1>Carrito</h1>

        <h2>
          Tu carrito está vacío.
        </h2>

        <p>
          Parece que todavía no has encontrado
          ninguna pieza para llevar a casa.
        </p>

        <p>
          Explora nuestras colecciones y vuelve
          cuando alguna de ellas te enamore.
        </p>

        <div className="cart-empty">
          🛒
        </div>

        <p className="cart-message">
          Parece que aún no has añadido nada a tu selección.
        </p>
      </motion.div>
    </section>
  );
}