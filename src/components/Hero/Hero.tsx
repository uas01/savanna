import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
} from "framer-motion";

import heroImage from "../../assets/images/hero/hero.webp";

import "./Hero.css";

export default function Hero() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.4]
  );

  const smoothScale = useSpring(scale, {
    stiffness: 80,
    damping: 20,
  });

  const textY = useTransform(
    scrollYProgress,
    [0, 0.6],
    [0, -250]
  );

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.4],
    [1, 0]
  );

  const blur = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3],
    [0, 10, 0]
  );

  const filter = useMotionTemplate`
    blur(${blur}px)
  `;

  return (

    <section
      ref={heroRef}
      className="hero"
    >
      <motion.div
        className="hero-background"
        style={{
          scale: smoothScale,
          filter,
          backgroundImage: `url(${heroImage})`,
        }}
      />

      <div className="hero-overlay" />

      <div className="hero-center">
        <motion.div
          className="hero-content"
          style={{
            y: textY,
            opacity: textOpacity,
          }}
        >
          <span className="hero-subtitle">
            Interiorismo · Decoración · Cerámica
          </span>

          <h1>SAVANNA</h1>

          <p>
            Creamos detalles que llenan tu hogar de belleza
            y tus días de recuerdos.
          </p>
        </motion.div>
      </div>
    </section>
  );
}