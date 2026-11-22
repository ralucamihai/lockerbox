import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="american-panel" data-testid="not-found">
      <div className="panel-header">
        <h2>Pagina nu există</h2>
        <span className="stamp-pill">404</span>
      </div>
      <p className="info">Adresa cerută nu duce nicăieri.</p>
      <Link to="/">Înapoi la lockere</Link>
    </section>
  );
}
