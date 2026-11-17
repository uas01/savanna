import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import "./Header.css";

const links = [
  { label: "Estancias", to: "/#estancias" },
  { label: "Trabajos", to: "/#filosofia" },
  { label: "Contacto", to: "/#contacto" },
  { label: "Outlet", to: "/outlet" },
];

export default function Header({ isHome }: { isHome: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const hero = document.querySelector(".hero");
    const footer = document.getElementById("contacto");

    const updateHeader = () => {
      setScrolled(!hero || window.scrollY > hero.clientHeight - 120);
      setFooterVisible(
        !!footer &&
          footer.getBoundingClientRect().top < window.innerHeight * 0.8,
      );
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);
    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, [isHome]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const desktop = window.matchMedia("(min-width: 769px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.getElementById("mobile-menu-toggle")?.focus();
      }
    };

    document.body.style.overflow = "hidden";
    desktop.addEventListener("change", closeOnDesktop);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const solid = !isHome || scrolled;

  return (
    <>
      <header
        className={[
          "header",
          solid && "header-solid",
          !isHome && "header-inner",
          isHome && footerVisible && "header-footer",
          menuOpen && "header-menu-open",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <Link className="header-logo" to="/" onClick={closeMenu}>
          SAVANNA
        </Link>

        <nav className="header-nav" aria-label="Principal">
          {links.map(({ label, to }) => (
            <Link
              key={to}
              className={to === "/outlet" ? "nav-link outlet-link" : "nav-link"}
              to={to}
            >
              {label}
            </Link>
          ))}
          <Link className="cart-button" to="/carrito" aria-label="Carrito">
            <ShoppingBag size={22} />
          </Link>
        </nav>

        <button
          id="mobile-menu-toggle"
          type="button"
          className={menuOpen ? "hamburger active" : "hamburger"}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls={menuOpen ? "mobile-menu" : undefined}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {menuOpen && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Principal">
          {links.map(({ label, to }) => (
            <Link
              key={to}
              className={
                to === "/outlet" ? "mobile-link outlet-link" : "mobile-link"
              }
              to={to}
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
          <Link
            className="mobile-link mobile-cart"
            to="/carrito"
            aria-label="Carrito"
            onClick={closeMenu}
          >
            <ShoppingBag size={30} />
          </Link>
        </nav>
      )}
    </>
  );
}
