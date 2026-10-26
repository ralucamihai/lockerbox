import { useState } from "react";
import LockerList from "./components/LockerList.jsx";

// Datele aplicației: Lockere pentru colete cu numărul de compartimente per dimensiune
const LOCKERE_INITIALE = [
  { 
    id: 1, 
    name: "LOCKER B-101 (DEPOT OTOPENI)", 
    rented: false, 
    size: "large", 
    zone: "DNCB Km 14 • Stație Colete Otopeni",
    slots: { small: 5, medium: 2, large: 1 }
  },
  { 
    id: 2, 
    name: "LOCKER B-204 (HUB MILITARI)", 
    rented: true, 
    size: "medium", 
    zone: "Ieșire A1 • Militari Shopping Center",
    slots: { small: 0, medium: 1, large: 3 }
  },
  { 
    id: 3, 
    name: "LOCKER B-007 (PUNCT UNIRII)", 
    rented: false, 
    size: "small", 
    zone: "Hub Central • Piața Unirii MP 0",
    slots: { small: 8, medium: 4, large: 0 }
  }
];

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [lockers, setLockers] = useState(LOCKERE_INITIALE);
  const [tema, setTema] = useState(temaInitiala);

  // Comutare stare rented (Ocupat <-> Liber)
  function handleToggle(id) {
    setLockers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, rented: !item.rented } : item))
    );
  }

  // Ștergere locker
  function handleDelete(id) {
    setLockers((prev) => prev.filter((item) => item.id !== id));
  }

  // Comutare tema (Zi / Noapte)
  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  // Valori derivate (calculate automat)
  const libere = lockers.filter((item) => !item.rented).length;
  const ocupate = lockers.length - libere;

  // Calculul total al compartimentelor libere pe toate hub-urile
  const totalSlotsSmall = lockers.reduce((acc, curr) => acc + (curr.slots?.small || 0), 0);
  const totalSlotsMedium = lockers.reduce((acc, curr) => acc + (curr.slots?.medium || 0), 0);
  const totalSlotsLarge = lockers.reduce((acc, curr) => acc + (curr.slots?.large || 0), 0);

  return (
    <>
      <header className="highway-header app-header">
        <button
          className="theme-toggle"
          onClick={handleTema}
          aria-pressed={tema === "dark"}
          type="button"
        >
          {tema === "dark" ? "☀️ Mod de zi" : "🌙 Mod de noapte"}
        </button>

        <div className="billboard-title">
          <div className="neon-border">
            <h1 className="neon-text">LOCKER<span className="flicker">BOX</span> BUCHAREST</h1>
            <p className="tagline">SISTEM MONITORIZARE COLETE & COMPARTIMENTE</p>
          </div>
          
          <div className="dashboard-meter">
            <span className="status-lamp active"></span>
            <span className="live-counter">
              STAȚII: {lockers.length} TOTAL • {libere} LIBERE • {ocupate} OCUPATE
            </span>
          </div>

          <div className="global-slots-bar">
            <span>DISPONIBILITATE TOTALĂ COMPARTIMENTE:</span>
            <strong className="badge-slot">S: {totalSlotsSmall}</strong>
            <strong className="badge-slot">M: {totalSlotsMedium}</strong>
            <strong className="badge-slot">L: {totalSlotsLarge}</strong>
          </div>
        </div>
      </header>

      <main className="road-container">
        <section className="american-panel">
          <div className="panel-header diner-badge">
            <h2>STARE LOCKERE & COMPARTIMENTE DISPONIBILE</h2>
            <span className="stamp-pill">LIVE PARCEL DISPATCH</span>
          </div>

          <LockerList
            lockers={lockers}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </section>
      </main>

      <footer className="highway-footer">
        <div className="footer-sign">
          <span>BUCHAREST PARCEL LOCKER SYSTEM • EXPRESS DELIVERY</span>
          <p>Proiect Tehnologii Web • Monitorizare Lockere și Compartimente 📦🔓</p>
        </div>
      </footer>
    </>
  );
}