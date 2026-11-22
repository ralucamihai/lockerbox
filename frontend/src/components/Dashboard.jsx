import styles from "./Dashboard.module.css";

export default function Dashboard({ lockers }) {
  const total = lockers.length;
  const libere = lockers.filter((l) => !l.rented).length;
  const ocupate = total - libere;
  const rataOcupare = total > 0 ? Math.round((ocupate / total) * 100) : 0;

  const totalS = lockers.reduce((acc, curr) => acc + (curr.slots?.small || 0), 0);
  const totalM = lockers.reduce((acc, curr) => acc + (curr.slots?.medium || 0), 0);
  const totalL = lockers.reduce((acc, curr) => acc + (curr.slots?.large || 0), 0);

  return (
    <div className={styles.dashboardView}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>📦</span>
          <div className={styles.statInfo}>
            <h3>Grad Ocupare Rețea</h3>
            <p className={styles.statValue}>{rataOcupare}%</p>
          </div>
          <div className={styles.progressBarBg}>
            <div className={styles.progressBarFill} style={{ width: `${rataOcupare}%` }}></div>
          </div>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statIcon}>🔓</span>
          <div className={styles.statInfo}>
            <h3>Lockere Libere</h3>
            <p className={styles.statValue}>{libere} / {total}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statIcon}>📍</span>
          <div className={styles.statInfo}>
            <h3>Total Stații Active</h3>
            <p className={styles.statValue}>{total} Hub-uri</p>
          </div>
        </div>
      </div>

      <div className={styles.slotsSummaryPanel}>
        <h3>📊 Sumar Compartimente Disponibile în Oraș</h3>
        <div className={styles.slotsGrid}>
          <div className={`${styles.slotBox} ${styles.slotS}`}>
            <span className={styles.slotLabel}>Plicuri / Small (S)</span>
            <span className={styles.slotCount}>{totalS} Libere</span>
          </div>
          <div className={`${styles.slotBox} ${styles.slotM}`}>
            <span className={styles.slotLabel}>Cutii Medii / Medium (M)</span>
            <span className={styles.slotCount}>{totalM} Libere</span>
          </div>
          <div className={`${styles.slotBox} ${styles.slotL}`}>
            <span className={styles.slotLabel}>Voluminoase / Large (L)</span>
            <span className={styles.slotCount}>{totalL} Libere</span>
          </div>
        </div>
      </div>
    </div>
  );
}