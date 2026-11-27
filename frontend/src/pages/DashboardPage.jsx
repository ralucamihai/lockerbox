import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard.jsx";
import { fetchLockers } from "../api.js";

export default function DashboardPage() {
  const [lockers, setLockers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <section className="american-panel">
      <div className="panel-header">
        <h2>TABLOU DE BORD &amp; ANALITICĂ</h2>
        <span className="stamp-pill">LIVE ANALYTICS</span>
      </div>

      {loading && <p className="info">Se încarcă datele...</p>}
      {error && (
        <p className="error">
          Nu am putut încărca datele: {error}. Rulează <code>npm run dev</code> în <code>backend/</code>?
        </p>
      )}
      {!loading && !error && <Dashboard lockers={lockers} />}
    </section>
  );
}
