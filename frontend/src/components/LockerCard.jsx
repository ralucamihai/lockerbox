const ETICHETE_MARIMI = {
  small: "COMPACT / HARLEY BAG",
  medium: "PICKUP MEDIU / V8 CABIN",
  large: "CARGO MARE / SEMI-TRAILER"
};

export default function LockerCard({ locker }) {
  const esteOcupat = locker.rented;

  return (
    <li className={esteOcupat ? "highway-card status-rented done" : "highway-card status-free"}>
      <div className="locker-route-marker">
        <span className="milepost">MP {String(locker.id).padStart(3, "0")}</span>
      </div>

      <div className="card-details">
        <h3>{locker.name}</h3>
        <div className="specs">
          <span className={`us-badge badge-${locker.size}`}>
            {ETICHETE_MARIMI[locker.size] || locker.size}
          </span>
          <span className="tag-loc">Parcare: {locker.zone || "Highway Depot"}</span>
        </div>
      </div>

      <div className="card-action">
        <span className={esteOcupat ? "status-indicator busy" : "status-indicator open"}>
          {esteOcupat ? "ÎNCHIRIAT" : "LIBER"}
        </span>
        <button 
          className={esteOcupat ? "diner-btn-sm disabled" : "diner-btn-sm"} 
          disabled={esteOcupat} 
          type="button"
        >
          {esteOcupat ? "Ocupat 🔒" : "Închiriază 🏁"}
        </button>
      </div>
    </li>
  );
}