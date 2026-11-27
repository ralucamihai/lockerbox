import { useEffect, useState } from "react";
import LockerList from "../components/LockerList.jsx";
import LockerForm from "../components/LockerForm.jsx";
import {
  createLocker,
  deleteLocker,
  fetchLockers,
  updateLocker,
} from "../api.js";
import styles from "./LockersPage.module.css";

export default function LockersPage() {
  const [lockers, setLockers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtre
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");

  // Rulează o singură dată, după prima randare
  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await fetchLockers();
        if (!ignore) setLockers(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  // Întâi serverul, apoi state-ul: pe ecran ajunge doar ce s-a salvat
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

  // Filtrăm lockerele după căutare și selecții
  const text = searchQuery.toLowerCase();
  const lockersFiltrate = lockers.filter((item) => {
    const meciText =
      item.name.toLowerCase().includes(text) ||
      (item.zone || "").toLowerCase().includes(text);
    const meciStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "free"
        ? !item.rented
        : item.rented;
    const meciMarime = sizeFilter === "all" ? true : item.size === sizeFilter;

    return meciText && meciStatus && meciMarime;
  });

  // Valori derivate: se recalculează la fiecare randare
  const libere = lockers.filter((item) => !item.rented).length;
  const ocupate = lockers.length - libere;
  const totalS = lockers.reduce((acc, l) => acc + (l.slots?.small || 0), 0);
  const totalM = lockers.reduce((acc, l) => acc + (l.slots?.medium || 0), 0);
  const totalL = lockers.reduce((acc, l) => acc + (l.slots?.large || 0), 0);

  return (
    <div className={styles.mainGrid}>
      <section className="american-panel">
        <div className="panel-header">
          <h2>ADAUGĂ LOCKER NOU</h2>
          <span className="stamp-pill">CREATE LOCKER</span>
        </div>
        <LockerForm onAdd={handleAdd} />
      </section>

      <section className="american-panel">
        <div className="panel-header">
          <h2>STARE LOCKERE &amp; CĂUTARE</h2>
          <span className="stamp-pill">LIVE PARCEL DISPATCH</span>
        </div>

        <div className={styles.metaRow}>
          <div className={styles.dashboardMeter}>
            <span className={styles.statusLamp}></span>
            <span>
              STAȚII: {lockers.length} TOTAL • {libere} LIBERE • {ocupate} OCUPATE
            </span>
          </div>
          <div className={styles.globalSlotsBar}>
            <span>DISPONIBILITATE:</span>
            <strong className={styles.badgeSlot}>S: {totalS}</strong>
            <strong className={styles.badgeSlot}>M: {totalM}</strong>
            <strong className={styles.badgeSlot}>L: {totalL}</strong>
          </div>
        </div>

        <div className={styles.filterBar}>
          <input
            type="text"
            placeholder="🔍 Caută după nume sau locație..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
            aria-label="Caută lockere"
          />
          <div className={styles.selectGroup}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filtru stare"
            >
              <option value="all">Toate stările</option>
              <option value="free">Doar Libere 🔓</option>
              <option value="rented">Doar Ocupate 📦</option>
            </select>
            <select
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value)}
              aria-label="Filtru mărime"
            >
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
            Nu am putut efectua operația: <strong>{error}</strong>. Rulează{" "}
            <code>npm run dev</code> în <code>backend/</code>?
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
  );
}
