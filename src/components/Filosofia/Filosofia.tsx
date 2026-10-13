import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";

import "./Filosofia.css";

import project1 from "../../assets/images/proyectos/project-1.webp";
import project2 from "../../assets/images/proyectos/project-2.webp";
import project3 from "../../assets/images/proyectos/project-3.webp";

const projects = [
  {
    id: 1,
    title: "Ático Madrid",
    image: project1,
  },
  {
    id: 2,
    title: "Villa Mediterránea",
    image: project2,
  },
  {
    id: 3,
    title: "Apartamento Valencia",
    image: project3,
  },
];

type Project = {
  id: number;
  title: string;
  image: string;
};

export default function Filosofia() {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  useEffect(() => {
    const header =
      document.querySelector(
        ".header"
      ) as HTMLElement | null;

    if (selectedProject) {
      document.body.style.overflow =
        "hidden";

      if (header) {
        header.style.opacity = "0";
        header.style.pointerEvents =
          "none";
      }
    } else {
      document.body.style.overflow =
        "auto";

      if (header) {
        header.style.opacity = "1";
        header.style.pointerEvents =
          "auto";
      }
    }

    return () => {
      document.body.style.overflow =
        "auto";

      if (header) {
        header.style.opacity = "1";
        header.style.pointerEvents =
          "auto";
      }
    };
  }, [selectedProject]);

  return (
    
    <section id="filosofia" className="filosofia">
      <div className="filosofia-header">
        <span>NUESTRA FILOSOFÍA</span>

        <h2>
          Diseñamos espacios
          para ser habitados.
        </h2>

        <p>
          En Savanna entendemos el
          interiorismo como el equilibrio
          entre funcionalidad, belleza y
          materiales que perduran en el
          tiempo. Cada proyecto busca crear
          espacios que acompañen la vida
          diaria de forma natural y
          atemporal.
        </p>
      </div>

      <div className="projects-carousel">
        {projects.map((project) => (
          <motion.article
            key={project.id}
            className="project-card"
            whileHover={{ y: -8 }}
            onClick={() =>
              setSelectedProject(project)
            }
          >
          <img
              src={project.image}
            />

            <div className="project-overlay">
              <h3>{project.title}</h3>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() =>
              setSelectedProject(null)
            }
          >
            <motion.div
              className="lightbox-content"
              initial={{
                scale: 0.9,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <button
                type="button"
                className="lightbox-close"
                onClick={() =>
                  setSelectedProject(null)
                }
              >
                ×
              </button>

<img
  src={selectedProject.image}
  alt={selectedProject.title}
/>
              <div className="lightbox-info">
                <h3>
                  {selectedProject.title}
                </h3>

                <p>
                  Proyecto de interiorismo
                  desarrollado por Savanna,
                  donde la funcionalidad y la
                  estética conviven de forma
                  natural para crear espacios
                  únicos y atemporales.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
