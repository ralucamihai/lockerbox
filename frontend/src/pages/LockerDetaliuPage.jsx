import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchLocker } from "../api.js";
import { ETICHETE_MARIME } from "../constants.js";
import styles from "./LockerDetaliuPage.module.css";

export default function LockerDetaliuPage() {
  const { id } = useParams(); // text din URL, de exemplu "3"
  const [locker, setLocker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Se reîncarcă dacă se schimbă id-ul din adresă
  useEffect(() => {
    let ignore = false;

    fetchLocker(id)
      .then((data) => {
        if (!ignore) {
          setLocker(data);
          setError(null); // o eroare de la un id anterior nu mai este valabilă
        }
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <p className="info" data-testid="loading">
        Se încarcă lockerul...
      </p>
    );
  }

  if (error) {
    return (
      <section className="american-panel">
        <p className="error" data-testid="error">
          Lockerul nu a putut fi încărcat: {error}
        </p>
        <Link to="/" className={styles.back}>
          ← Înapoi la listă
        </Link>
      </section>
    );
  }

  const slots = locker.slots || {};

  return (
    <section className={`american-panel ${styles.detail}`} data-testid="detail">
      <Link to="/" className={styles.back}>
        ← Înapoi la listă
      </Link>
      <h2
        className={locker.rented ? styles.rented : undefined}
        data-testid="detail-title"
      >
        {locker.name}
      </h2>

      <dl className={styles.fields}>
        <dt>Stare</dt>
        <dd>{locker.rented ? "OCUPAT 📦" : "LIBER 🔓"}</dd>

        <dt>Mărime</dt>
        <dd>
          <span className={`us-badge badge-${locker.size}`}>
            {ETICHETE_MARIME[locker.size] || locker.size}
          </span>
        </dd>

        <dt>Locație</dt>
        <dd>📍 {locker.zone || "București Depot"}</dd>

        <dt>Compartimente libere</dt>
        <dd>
          S: {slots.small ?? 0} • M: {slots.medium ?? 0} • L: {slots.large ?? 0}
        </dd>

        <dt>ID</dt>
        <dd>{locker.id}</dd>
      </dl>
    </section>
  );
}
