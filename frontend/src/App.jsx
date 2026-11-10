import { useEffect, useState } from "react";
import LockerList from "./components/LockerList.jsx";
import LockerForm from "./components/LockerForm.jsx";
import Dashboard from "./components/Dashboard.jsx";
import InfoRules from "./components/InfoRules.jsx";
import { fetchLockers, createLocker, updateLocker, deleteLocker } from "./api.js";

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [lockers, setLockers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tema, setTema] = useState(temaInitiala);

  // Tab active: "list", "dashboard", "rules"
  const [activeTab, setActiveTab] = useState("list");

  // Filtre
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchLockers();
        if (!ignore) {
          setLockers(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  async function handleAdd(newLocker) {
    const creat = await createLocker(newLocker);
    setLockers((prev) => [...prev, creat]);
  }

  async function handleToggle(id) {
    const deModificat = lockers.find((item) => item.id === id);
    if (!deModificat) return;

    try {
      const actualizat = await updateLocker(id, { rented: !deModificat.rented });
      setLockers((prev) =>
        prev.map((item) => (item.id === id ? actualizat : item))
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteLocker(id);
      setLockers((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  // Filtrăm lockerele după căutare și selecții
  const lockersFiltrate = lockers.filter((item) => {
    const meciNume = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     item.zone.toLowerCase().includes(searchQuery.toLowerCase());
    const meciStatus = statusFilter === "all" ? true :
                       statusFilter === "free" ? !item.rented : item.rented;
    const meciMarime = sizeFilter === "all" ? true : item.size === sizeFilter;

    return meciNume && meciStatus && meciMarime;
  });

  const libere = lockers.filter((item) => !item.rented).length;
  const ocupate = lockers.length - libere;

  const totalSlotsSmall = lockers.reduce((acc, curr) => acc + (curr.slots?.small || 0), 0);
  const totalSlotsMedium = lockers.reduce((acc, curr) => acc + (curr.slots?.medium || 0), 0);
  const totalSlotsLarge = lockers.reduce((acc, curr) => acc + (curr.slots?.large || 0), 0);

  return (
    <>
      <header className="app-header">
        <div className="header-top-row">
          <div className="billboard-title">
            <div className="neon-border">
              <h1 className="neon-text">LOCKER<span className="flicker">BOX</span> BUCHAREST</h1>
            </div>
            <p className="tagline">SYSTEM MONITORIZARE COLETE & COMPARTIMENTE</p>
          </div>

          <div className="header-controls">
            <div className="dashboard-meter">
              <span className="status-lamp active"></span>
              <span>STAȚII: {lockers.length} TOTAL • {libere} LIBERE • {ocupate} OCUPATE</span>
            </div>

            <button
              className="theme-toggle"
              onClick={handleTema}
              aria-pressed={tema === "dark"}
              type="button"
            >
              {tema === "dark" ? "☀️ Mod de zi" : "🌙 Mod de noapte"}
            </button>
          </div>
        </div>

        <div className="header-bottom-row">
          <nav className="highway-nav">
            <button
              className={`nav-tab ${activeTab === "list" ? "active" : ""}`}
              onClick={() => setActiveTab("list")}
              type="button"
            >
              🏁 Exit 1: Lista Lockere
            </button>
            <button
              className={`nav-tab ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveTab("dashboard")}
              type="button"
            >
              📊 Exit 2: Tablou de Bord
            </button>
            <button
              className={`nav-tab ${activeTab === "rules" ? "active" : ""}`}
              onClick={() => setActiveTab("rules")}
              type="button"
            >
              📜 Exit 3: Regulament & Info
            </button>
          </nav>

          <div className="global-slots-bar">
            <span>DISPONIBILITATE TOTALĂ:</span>
            <strong className="badge-slot">S: {totalSlotsSmall}</strong>
            <strong className="badge-slot">M: {totalSlotsMedium}</strong>
            <strong className="badge-slot">L: {totalSlotsLarge}</strong>
          </div>
        </div>
      </header>

      <main className="road-container">
        {activeTab === "list" && (
          <div className="main-grid">
            <section className="american-panel">
              <div className="panel-header diner-badge">
                <h2>ADAUGĂ LOCKER NOU</h2>
                <span className="stamp-pill">CREATE LOCKER</span>
              </div>
              <LockerForm onAdd={handleAdd} />
            </section>

            <section className="american-panel">
              <div className="panel-header diner-badge">
                <h2>STARE LOCKERE & CAUTARE</h2>
                <span className="stamp-pill">LIVE PARCEL DISPATCH</span>
              </div>

              <div className="filter-bar">
                <input
                  type="text"
                  placeholder="🔍 Caută după nume sau locație..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <div className="select-group">
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="all">Toate stările</option>
                    <option value="free">Doar Libere 🔓</option>
                    <option value="rented">Doar Ocupate 📦</option>
                  </select>
                  <select value={sizeFilter} onChange={(e) => setSizeFilter(e.target.value)}>
                    <option value="all">Toate mărimile</option>
                    <option value="small">Mărimea S</option>
                    <option value="medium">Mărimea M</option>
                    <option value="large">Mărimea L</option>
                  </select>
                </div>
              </div>

              {loading && (
                <p className="info" data-testid="loading">
                  Se încarcă stațiile și coletele...
                </p>
              )}

              {error && (
                <div className="error" data-testid="error">
                  Nu am putut efectua operația: <strong>{error}</strong>. Rulează <code>npm run api</code> în terminal?
                </div>
              )}

              {!loading && (
                <LockerList
                  lockers={lockersFiltrate}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              )}
            </section>
          </div>
        )}

        {activeTab === "dashboard" && (
          <section className="american-panel">
            <div className="panel-header diner-badge">
              <h2>TABLOU DE BORD & ANALITICĂ</h2>
              <span className="stamp-pill">LIVE ANALYTICS</span>
            </div>
            <Dashboard lockers={lockers} />
          </section>
        )}

        {activeTab === "rules" && (
          <section className="american-panel">
            <div className="panel-header diner-badge">
              <h2>INFORMAȚII & NORME UTILIZARE</h2>
              <span className="stamp-pill">SYSTEM RULES</span>
            </div>
            <InfoRules />
          </section>
        )}
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