import LockerList from "./components/LockerList.jsx";

const lockers = [
  { id: 1, name: "LOCKER A-101 (TEXAS BIG TRUCK)", rented: false, size: "large", zone: "Stația Shell #4" },
  { id: 2, name: "LOCKER B-204 (ARIZONA CRUISER)", rented: true, size: "medium", zone: "Grand Canyon Motel" },
  { id: 3, name: "LOCKER C-007 (CALIFORNIA CHOPPER)", rented: false, size: "small", zone: "Santa Monica Pier" }
];

export default function App() {
  const libere = lockers.filter((item) => !item.rented).length;

  return (
    <>
      <header className="highway-header">
        <div className="billboard-title">
          <div className="neon-border">
            <h1 className="neon-text">LOCKER<span className="flicker">BOX</span> DEPOT</h1>
            <p className="tagline">COAST TO COAST • STORAGE & PIT STOP</p>
          </div>
          <div className="dashboard-meter">
            <span className="status-lamp active"></span>
            <span className="live-counter">
              MILE 244 • {lockers.length} LOCKERE DISPONIBILE ({libere} LIBERE)
            </span>
          </div>
        </div>
      </header>

      <main className="road-container">
        <section className="american-panel">
          <div className="panel-header diner-badge">
            <h2>LISTĂ LOCKERE PE AUTOSTRADĂ</h2>
            <span className="stamp-pill">LIVE ON ASPHALT</span>
          </div>

          <LockerList lockers={lockers} />
        </section>
      </main>

      <footer className="highway-footer">
        <div className="footer-sign">
          <span>HIGHWAY STORAGE SYSTEM • AMERICAN ROADWAY</span>
          <p>Proiect Tehnologii Web • Designed with High-Octane American Spirit 🏎️💨</p>
        </div>
      </footer>
    </>
  );
}