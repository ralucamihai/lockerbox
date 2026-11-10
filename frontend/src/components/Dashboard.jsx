export default function Dashboard({ lockers }) {
  const total = lockers.length;
  const libere = lockers.filter((l) => !l.rented).length;
  const ocupate = total - libere;
  const rataOcupare = total > 0 ? Math.round((ocupate / total) * 100) : 0;

  const totalS = lockers.reduce((acc, curr) => acc + (curr.slots?.small || 0), 0);
  const totalM = lockers.reduce((acc, curr) => acc + (curr.slots?.medium || 0), 0);
  const totalL = lockers.reduce((acc, curr) => acc + (curr.slots?.large || 0), 0);

  return (
    <div className="dashboard-view">
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">📦</span>
          <div className="stat-info">
            <h3>Grad Ocupare Rețea</h3>
            <p className="stat-value">{rataOcupare}%</p>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${rataOcupare}%` }}></div>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">🔓</span>
          <div className="stat-info">
            <h3>Lockere Libere</h3>
            <p className="stat-value">{libere} / {total}</p>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">📍</span>
          <div className="stat-info">
            <h3>Total Stații Active</h3>
            <p className="stat-value">{total} Hub-uri</p>
          </div>
        </div>
      </div>

      <div className="slots-summary-panel">
        <h3>📊 Sumar Compartimente Disponibile în Oraș</h3>
        <div className="slots-grid">
          <div className="slot-box slot-s">
            <span className="slot-label">Plicuri / Small (S)</span>
            <span className="slot-count">{totalS} Libere</span>
          </div>
          <div className="slot-box slot-m">
            <span className="slot-label">Cutii Medii / Medium (M)</span>
            <span className="slot-count">{totalM} Libere</span>
          </div>
          <div className="slot-box slot-l">
            <span className="slot-label">Voluminoase / Large (L)</span>
            <span className="slot-count">{totalL} Libere</span>
          </div>
        </div>
      </div>
    </div>
  );
}