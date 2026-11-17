import { useState } from "react";
import { products, euros } from "../../data/products";
import { useCart } from "../../features/cart/CartContext";
import "./Shop.css";
export default function ProductGrid({
  category,
  outlet = false,
}: {
  category?: string;
  outlet?: boolean;
}) {
  const [query, setQuery] = useState("");
  const { add } = useCart();
  const filtered = products.filter(
    (p) =>
      (!category || p.category === category) &&
      (!outlet || p.outlet) &&
      p.name.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="shop-wrap">
      <label className="shop-label" htmlFor="product-search">
        Buscar productos
      </label>
      <input
        id="product-search"
        className="shop-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar por nombre…"
      />
      <p className="shop-note">
        Catálogo de demostración: productos, precios y existencias ficticios. No
        se pueden realizar compras todavía.
      </p>
      <div className="shop-grid">
        {filtered.map((p) => (
          <article className="shop-card" key={p.id}>
            <div className="shop-placeholder" aria-hidden="true">
              SAVANNA
            </div>
            <div className="shop-card-body">
              <span className="shop-label">{p.category}</span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <strong>{euros(p.priceCents)}</strong>
              <p>Stock de prueba: {p.stock}</p>
              <button
                type="button"
                disabled={!p.stock}
                onClick={() => add(p.id)}
              >
                Añadir al carrito
              </button>
            </div>
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <p>No hay productos que coincidan con la búsqueda.</p>
      )}
    </div>
  );
}
