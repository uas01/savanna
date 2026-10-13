import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import "./Outlet.css";

export default function Outlet() {
  const navigate = useNavigate();

  return (
    <section className="outlet">
      <button
        type="button"
        className="back-button-top"
        onClick={() => navigate("/")}
      >
        ← Volver a Savanna
      </button>

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
        <span className="outlet-tag">
          SAVANNA OUTLET
        </span>

        <h1>Outlet</h1>

        <h2>
          Estamos preparando algo especial.
        </h2>

        <p>
          Los productos Outlet de Savanna
          están siendo seleccionados para
          ofrecer piezas únicas, últimas
          unidades y colecciones con precios
          especiales.
        </p>

        <p>
          Muy pronto encontrarás auténticos
          tesoros para tu hogar.
        </p>

        <div className="error-code">
          404
        </div>

        <p className="funny-text">
          Parece que nuestros productos
          siguen escondidos en el almacén...
        </p>

      </motion.div>
    </section>
  );
}
