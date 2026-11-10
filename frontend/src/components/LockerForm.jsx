import { useState } from "react";

const MARIMI = [
  { value: "small", label: "S • PLICURI & GADGETURI" },
  { value: "medium", label: "M • CUTII MEDII / HAINE" },
  { value: "large", label: "L • COLETE MARI / VOLUMINOASE" }
];

const NUME_MAX = 100;

export default function LockerForm({ onAdd }) {
  const [name, setName] = useState("");
  const [size, setSize] = useState("medium");
  const [zone, setZone] = useState("");
  const [eroare, setEroare] = useState("");
  const [trimite, setTrimite] = useState(false);

  function valideaza() {
    const n = name.trim();
    if (n === "") return "Denumirea lockerului este obligatorie.";
    if (n.length > NUME_MAX) return `Denumirea poate avea maximum ${NUME_MAX} de caractere.`;
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault(); // Oprește reîncărcarea paginii

    const mesaj = valideaza();
    if (mesaj) {
      setEroare(mesaj);
      return;
    }

    setEroare("");
    setTrimite(true);

    try {
      await onAdd({
        name: name.trim(),
        rented: false,
        size: size,
        zone: zone.trim() || "Stație București",
        slots: { small: 3, medium: 2, large: 1 }
      });

      // Golim câmpurile DOAR dacă salvarea pe server a reușit!
      setName("");
      setSize("medium");
      setZone("");
    } catch (err) {
      setEroare(err.message);
    } finally {
      setTrimite(false);
    }
  }

  return (
    <form className="locker-form" onSubmit={handleSubmit} noValidate data-testid="form">
      <label>
        Denumire Locker / Stație
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: LOCKER B-402 (HUB VIRTUTII)"
          maxLength={NUME_MAX}
          aria-invalid={Boolean(eroare)}
          data-testid="form-title"
        />
      </label>

      <label>
        Dimensiune Colete
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          data-testid="form-size"
        >
          {MARIMI.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Locație / Zona Hub
        <input
          type="text"
          value={zone}
          onChange={(e) => setZone(e.target.value)}
          placeholder="Ex: Bd. Virtuții Km 3"
          data-testid="form-zone"
        />
      </label>

      {eroare && (
        <p className="form-error-msg" data-testid="form-error">
          ⚠️ {eroare}
        </p>
      )}

      <button
        type="submit"
        disabled={trimite}
        className="btn-submit"
        data-testid="form-submit"
      >
        {trimite ? "Se salvează..." : "Adaugă Locker în Rețea ➕"}
      </button>
    </form>
  );
}