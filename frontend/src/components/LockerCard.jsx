const ETICHETE_MARIMI = {
  small: "S • PLICURI & GADGETURI",
  medium: "M • CUTII MEDII / HAINE",
  large: "L • COLETE MARI / VOLUMINOASE"
};

export default function LockerCard({ locker, onToggle, onDelete }) {
  const esteOcupat = locker.rented;

  return (
    <li className={esteOcupat ? "highway-card status-rented done" : "highway-card status-free"}>
      <label className="locker-main">
        <input
          type="checkbox"
          checked={esteOcupat}
          onChange={() => onToggle(locker.id)}
          className="locker-checkbox"
          title="Bifează pentru a schimba starea (Liber / Ocupat)"
        />

        <div className="locker-route-marker">
          <span className="milepost">BOX {String(locker.id).padStart(3, "0")}</span>
        </div>

        <div className="card-details">
          <h3>{locker.name}</h3>
          <div className="specs">
            <span className={`us-badge badge-${locker.size}`}>
              {ETICHETE_MARIMI[locker.size] || locker.size}
            </span>
            <span className="tag-loc">📍 {locker.zone || "București Depot"}</span>
          </div>

          {/* Afișarea disponibilității compartimentelor din hub */}
          {locker.slots && (
            <div className="compartments-info">
              <span className="comp-title">Disponibilitate compartimente hub:</span>
              <div className="comp-badges">
                <span className={`comp-pill ${locker.slots.small > 0 ? "available" : "full"}`}>
                  S: {locker.slots.small} libere
                </span>
                <span className={`comp-pill ${locker.slots.medium > 0 ? "available" : "full"}`}>
                  M: {locker.slots.medium} libere
                </span>
                <span className={`comp-pill ${locker.slots.large > 0 ? "available" : "full"}`}>
                  L: {locker.slots.large} libere
                </span>
              </div>
            </div>
          )}
        </div>
      </label>

      <div className="card-action">
        <span className={esteOcupat ? "status-indicator busy" : "status-indicator open"}>
          {esteOcupat ? "OCUPAT 📦" : "LIBER 🔓"}
        </span>
        <button
          className="btn-danger"
          onClick={() => onDelete(locker.id)}
          aria-label={`Șterge ${locker.name}`}
          type="button"
        >
          Șterge 🗑️
        </button>
      </div>
    </li>
  );
}