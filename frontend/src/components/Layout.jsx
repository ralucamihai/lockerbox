import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

// Tema de pornire: cea a sistemului de operare
function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// NavLink marchează singur pagina curentă
function navClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

export default function Layout() {
  const [tema, setTema] = useState(temaInitiala);

  // Atributul data-theme de pe <html> comandă variabilele CSS
  useEffect(() => {
    document.documentElement.dataset.theme = tema;
  }, [tema]);

  function handleTema() {
    setTema((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <>
      <header className={styles.appHeader}>
        <div className={styles.headerTopRow}>
          <div className={styles.billboardTitle}>
            <div className={styles.neonBorder}>
              <h1 className={styles.neonText}>
                LOCKER<span className={styles.flicker}>BOX</span> BUCHAREST
              </h1>
            </div>
            <p className={styles.tagline}>
              SYSTEM MONITORIZARE COLETE &amp; COMPARTIMENTE
            </p>
          </div>

          <div className={styles.headerControls}>
            <button
              className={styles.themeToggle}
              onClick={handleTema}
              aria-pressed={tema === "dark"}
              type="button"
            >
              {tema === "dark" ? "☀️ Mod de zi" : "🌙 Mod de noapte"}
            </button>
          </div>
        </div>

        <div className={styles.headerBottomRow}>
          <nav className={styles.nav} data-testid="nav">
            <NavLink to="/" end className={navClass}>
              🏁 Lockere
            </NavLink>
            <NavLink to="/dashboard" className={navClass}>
              📊 Tablou de bord
            </NavLink>
            <NavLink to="/regulament" className={navClass}>
              📜 Regulament
            </NavLink>
            <NavLink to="/despre" className={navClass}>
              ℹ️ Despre
            </NavLink>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerSign}>
          <span>BUCHAREST PARCEL LOCKER SYSTEM • EXPRESS DELIVERY</span>
          <p>Proiect Tehnologii Web • Monitorizare Lockere și Compartimente 📦🔓</p>
        </div>
      </footer>
    </>
  );
}
