import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { euros, products } from "../../data/products";
import { useCart } from "../../features/cart/CartContext";
import {
  SHIPPING_ZONES,
  shippingQuoteStatus,
  type ShippingZone,
} from "../../features/shipping/shipping";
import "../../components/Shop/Shop.css";

import "./Cart.css";

export default function Cart() {
  const { lines, subtotalCents, setQuantity, remove } = useCart();
  const [zone, setZone] = useState<ShippingZone>("peninsula");

  return (
    <section className="cart-page">
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
        <span className="cart-tag">SAVANNA</span>

        <h1>Carrito</h1>

        <div className="shop-links">
          <Link to="/catalogo">Seguir comprando</Link>
        </div>
        {lines.length === 0 ? (
          <>
            <h2>Tu carrito está vacío.</h2>

            <p>
              Parece que todavía no has encontrado ninguna pieza para llevar a
              casa.
            </p>

            <p>
              Explora nuestras colecciones y vuelve cuando alguna de ellas te
              enamore.
            </p>

            <div className="cart-empty">🛒</div>

            <p className="cart-message">
              Parece que aún no has añadido nada a tu selección.
            </p>
          </>
        ) : (
          <>
            {lines.map(({ productId, quantity }) => {
              const product = products.find(({ id }) => id === productId);
              if (!product) return null;
              return (
                <div className="shop-cart-row" key={productId}>
                  <div>
                    <strong>{product.name}</strong>
                    <div>{euros(product.priceCents)} por unidad</div>
                  </div>
                  <label>
                    Cantidad
                    <input
                      type="number"
                      min={1}
                      max={product.stock}
                      value={quantity}
                      onChange={(event) => {
                        if (event.target.valueAsNumber >= 1) {
                          setQuantity(productId, event.target.valueAsNumber);
                        }
                      }}
                    />
                  </label>
                  <strong>{euros(product.priceCents * quantity)}</strong>
                  <button type="button" onClick={() => remove(productId)}>
                    Eliminar
                  </button>
                </div>
              );
            })}
            <div className="shop-summary">
              <strong>Subtotal de demostración: {euros(subtotalCents)}</strong>
              <label className="shop-label" htmlFor="shipping-zone">
                Destino del envío
              </label>
              <select
                id="shipping-zone"
                className="shop-select"
                value={zone}
                onChange={(event) =>
                  setZone(event.target.value as ShippingZone)
                }
              >
                {Object.entries(SHIPPING_ZONES).map(([id, { label }]) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
              <p>{shippingQuoteStatus(zone)}</p>
              <p>
                Pedido de prueba. Los gastos de envío y los impuestos están
                pendientes de configuración.
              </p>
              <button className="shop-button" type="button" disabled>
                Pago no disponible
              </button>
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
}
