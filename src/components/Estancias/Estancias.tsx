import { useNavigate } from "react-router-dom";

import "./Estancias.css";

import salon from "../../assets/images/estancias/salon.webp";
import cocina from "../../assets/images/estancias/cocina.webp";
import dormitorio from "../../assets/images/estancias/dormitorio.webp";
import bano from "../../assets/images/estancias/bano.webp";
import comedor from "../../assets/images/estancias/comedor.webp";
import exterior from "../../assets/images/estancias/exterior.webp";

const rooms = [
  {
    title: "Salón",
    slug: "salon",
    image: salon,
  },
  {
    title: "Cocina",
    slug: "cocina",
    image: cocina,
  },
  {
    title: "Dormitorio",
    slug: "dormitorio",
    image: dormitorio,
  },
  {
    title: "Baño",
    slug: "bano",
    image: bano,
  },
  {
    title: "Comedor",
    slug: "comedor",
    image: comedor,
  },
  {
    title: "Exterior",
    slug: "exterior",
    image: exterior,
  },
];

export default function Estancias() {
  const navigate = useNavigate();

  return (
    <section
      id="estancias"
      className="estancias"
    >
      <div className="estancias-header">
        <span>ESTANCIAS</span>
      </div>

      <div className="estancias-grid">
        {rooms.map((room) => (
          <article
  key={room.title}
  className="room-card"
  onClick={() =>
    navigate(
      `/estancias/${room.slug}`
    )
  }
>
  <img
    src={room.image}
    alt={room.title}
    className="room-image"
  />
  <div className="room-overlay">
    <h3>{room.title}</h3>
  </div>
</article>
        ))}
      </div>
    </section>
  );
}
