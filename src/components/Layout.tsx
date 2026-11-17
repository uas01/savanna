import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Footer from "./Footer/Footer";
import Header from "./Header/Header";

export default function Layout() {
  const { pathname, hash, key } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const target = hash && document.getElementById(hash.slice(1));
    if (target) {
      target.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash, key]);

  return (
    <>
      <Header key={pathname} isHome={isHome} />
      <main className={isHome ? undefined : "inner-page"}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
