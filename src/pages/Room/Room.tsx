import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import "./Room.css";

export default function Room() {
  const navigate = useNavigate();

  const { slug } = useParams();

  const titles: Record<
    string,
    string
  > = {
    salon: "Salón",
    cocina: "Cocina",
    dormitorio: "Dormitorio",
    bano: "Baño",
    comedor: "Comedor",
    exterior: "Exterior",
  };

  const roomName =
    titles[slug ?? ""] ??
    "Estancia";

  return (
    <section className="room-page">
    <button
  type="button"
  className="back-button-top"
  onClick={() => {
    navigate("/");

    setTimeout(() => {
      const estancias =
        document.getElementById(
          "estancias"
        );

      estancias?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }}
>
  ← Volver a Estancias
</button>


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
        <span className="room-tag">
          SAVANNA ESTANCIAS
        </span>

        <h1>{roomName}</h1>

        <h2>
          Estamos preparando este espacio.
        </h2>

        <p>
          Muy pronto encontrarás inspiración,
          productos y proyectos relacionados
          con esta estancia.
        </p>

        <div className="error-code">
          404
        </div>

        <p className="funny-text">
          Parece que todavía estamos
          decorando esta habitación...
        </p>
      </motion.div>
    </section>
  );
}
