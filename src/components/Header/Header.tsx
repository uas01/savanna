import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./Header.css";

export default function Header() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  const [footerVisible, setFooterVisible] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero =
        document.querySelector(".hero");

      if (!hero) return;

      setScrolled(
        window.scrollY >
          hero.clientHeight - 120
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  useEffect(() => {
    const handleFooter = () => {
      const footer =
        document.getElementById(
          "contacto"
        );

      if (!footer) return;

      const rect =
        footer.getBoundingClientRect();

      setFooterVisible(
        rect.top <
          window.innerHeight * 0.8
      );
    };

    handleFooter();

    window.addEventListener(
      "scroll",
      handleFooter
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleFooter
      );
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "auto";
    }

    return () => {
      document.body.style.overflow =
        "auto";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const goTop = () => {
    navigate("/");

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);

    closeMenu();
  };

  const scrollToSection = (
    id: string
  ) => {
    if (
      window.location.pathname !== "/"
    ) {
      navigate("/");

      setTimeout(() => {
        const section =
          document.getElementById(id);

        section?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } else {
      const section =
        document.getElementById(id);

      section?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    closeMenu();
  };

  return (
    <>
      <header
        className={`header
          ${
            scrolled
              ? "header-solid"
              : ""
          }
          ${
            footerVisible
              ? "header-footer"
              : ""
          }
        `}
      >
        <button
          type="button"
          className="header-logo"
          onClick={goTop}
        >
          SAVANNA
        </button>

        <nav className="header-nav">
          <button
            className="nav-link"
            onClick={() =>
              scrollToSection(
                "estancias"
              )
            }
          >
            Estancias
          </button>

          <button
            className="nav-link"
            onClick={() =>
              scrollToSection(
                "filosofia"
              )
            }
          >
            Trabajos
          </button>

          <button
            className="nav-link"
            onClick={() =>
              scrollToSection(
                "contacto"
              )
            }
          >
            Contacto
          </button>

          <button
            className="nav-link outlet-link"
            onClick={() =>
              navigate("/outlet")
            }
          >
            Outlet
          </button>

          <button
            className="cart-button"
            onClick={() =>
              navigate("/carrito")
            }
            aria-label="Carrito"
          >
            <ShoppingBag size={22} />
          </button>
        </nav>

        <button
          className={`hamburger ${
            menuOpen
              ? "active"
              : ""
          }`}
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <button
            className="mobile-link"
            onClick={() =>
              scrollToSection(
                "estancias"
              )
            }
          >
            Estancias
          </button>

          <button
            className="mobile-link"
            onClick={() =>
              scrollToSection(
                "filosofia"
              )
            }
          >
            Trabajos
          </button>

          <button
            className="mobile-link"
            onClick={() =>
              scrollToSection(
                "contacto"
              )
            }
          >
            Contacto
          </button>

          <button
            className="mobile-link outlet-link"
            onClick={() => {
              navigate("/outlet");
              closeMenu();
            }}
          >
            Outlet
          </button>

          <button
            className="mobile-link mobile-cart"
            onClick={() => {
              navigate("/carrito");
              closeMenu();
            }}
          >
            <ShoppingBag size={30} />
          </button>
        </div>
      )}
    </>
  );
}