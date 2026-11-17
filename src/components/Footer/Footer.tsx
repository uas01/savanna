import { motion, useReducedMotion } from "framer-motion";

import { Link } from "react-router-dom";

import "./Footer.css";

export default function Footer() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.footer
      id="contacto"
      className="footer"
      initial={reducedMotion ? false : {
        opacity: 0,
        y: 100,
      }}
      whileInView={reducedMotion ? undefined : {
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: false,
        amount: 0.15,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      <section className="footer-grid">
        <div className="footer-column">
          <h3>Navegación</h3>

          <Link to="/catalogo">Productos</Link>
          <Link to="/#estancias">Estancias</Link>
          <Link to="/outlet">Outlet</Link>
          <Link to="/#contacto">Contacto</Link>
        </div>

        <div className="footer-column">
          <h3>Colecciones</h3>

          <button>Cerámica</button>
          <button>Decoración</button>
          <button>Hogar</button>
          <button>Ediciones limitadas</button>
        </div>

        <div className="footer-column">
          <h3>Contacto</h3>

          <button>Instagram</button>
          <button>TikTok</button>
          <button>WhatsApp</button>
          <a href="mailto:info@savanna.es">info@savanna.es</a>
        </div>
      </section>

      <section className="footer-newsletter">
        <h3>Únete a Savanna</h3>

        <p>
          Inspiración, novedades y
          lanzamientos directamente en tu
          correo.
        </p>

        <div className="newsletter-form">
          <input
            type="email"
            placeholder="Tu correo electrónico"
          />

          <button>
            Suscribirme
          </button>
        </div>
      </section>

      <section className="footer-bottom">
        <p>
          © 2026 SAVANNA
        </p>

        <div>
          <button>
            Privacidad
          </button>

          <button>
            Cookies
          </button>

          <button>
            Términos
          </button>
        </div>
      </section>
    </motion.footer>
  );
}