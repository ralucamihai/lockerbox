import { Link } from "react-router-dom";
import { ETICHETE_MARIME } from "../constants.js";
import styles from "./LockerCard.module.css";

export default function LockerCard({ locker, onToggle, onDelete }) {
  const esteOcupat = locker.rented;

  return (
    <li
      className={esteOcupat ? `${styles.card} ${styles.rented}` : styles.card}
      data-testid="item"
      data-id={locker.id}
    >
      <div className={styles.lockerMain}>
        <input
          type="checkbox"
          checked={esteOcupat}
          onChange={() => onToggle(locker.id)}
          className={styles.lockerCheckbox}
          aria-label={`Marchează ${locker.name} ca ocupat`}
          title="Bifează pentru a schimba starea (Liber / Ocupat)"
          data-testid="item-toggle"
        />

        <div>
          <span className={styles.milepost}>
            BOX {String(locker.id).padStart(3, "0")}
          </span>
        </div>

        <div className={styles.cardDetails}>
          <h3 className={styles.title}>
            <Link
              to={`/lockers/${locker.id}`}
              className={styles.titleLink}
              data-testid="item-link"
            >
              {locker.name}
            </Link>
          </h3>
          <div className={styles.specs}>
            <span className={`us-badge badge-${locker.size}`}>
              {ETICHETE_MARIME[locker.size] || locker.size}
            </span>
            <span className={styles.tagLoc}>📍 {locker.zone || "București Depot"}</span>
          </div>

          {locker.slots && (
            <div className={styles.compartmentsInfo}>
              <span className={styles.compTitle}>
                Disponibilitate compartimente hub:
              </span>
              <div className={styles.compBadges}>
                {["small", "medium", "large"].map((k) => (
                  <span
                    key={k}
                    className={`${styles.compPill} ${
                      locker.slots[k] > 0 ? styles.available : styles.full
                    }`}
                  >
                    {k[0].toUpperCase()}: {locker.slots[k]} libere
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.cardAction}>
        <span
          className={`${styles.statusIndicator} ${
            esteOcupat ? styles.busy : styles.open
          }`}
        >
          {esteOcupat ? "OCUPAT 📦" : "LIBER 🔓"}
        </span>
        <button
          className="btn-danger"
          onClick={() => onDelete(locker.id)}
          aria-label={`Șterge ${locker.name}`}
          type="button"
          data-testid="item-delete"
        >
          Șterge 🗑️
        </button>
      </div>
    </li>
  );
}
