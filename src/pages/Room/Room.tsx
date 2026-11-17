import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductGrid from "../../components/Shop/ProductGrid";
import { ROOM_TITLES } from "../../data/rooms";

import "./Room.css";

export default function Room() {
  const { slug } = useParams();

  const roomName = ROOM_TITLES[slug ?? ""] ?? "Estancia";

  return (
    <section className="room-page">
      <motion.div
        className="room-content"
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
        <span className="room-tag">SAVANNA ESTANCIAS</span>

        <h1>{roomName}</h1>

        <div className="shop-links">
          <Link to="/#estancias">← Volver a Estancias</Link>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/carrito">Ver carrito</Link>
        </div>
        <ProductGrid key={slug} category={slug} />
      </motion.div>
    </section>
  );
}
