import { useState } from "react";
import { MARIMI_LOCKER } from "../constants.js";
import styles from "./LockerForm.module.css";

const NUME_MAX = 100;
const ZONA_MAX = 100;

export default function LockerForm({ onAdd }) {
  const [name, setName] = useState("");
  const [size, setSize] = useState("medium");
  const [zone, setZone] = useState("");
  const [eroare, setEroare] = useState("");
  const [trimite, setTrimite] = useState(false);

  // Toate câmpurile formularului sunt verificate înainte de orice cerere.
  // Întoarce mesajul primei probleme găsite, sau "" dacă datele sunt valide.
  function valideaza() {
    const n = name.trim();
    const z = zone.trim();
    if (n === "") return "Denumirea lockerului este obligatorie.";
    if (n.length > NUME_MAX) return `Denumirea poate avea maximum ${NUME_MAX} de caractere.`;
    if (!MARIMI_LOCKER.some((m) => m.value === size)) return "Alege o dimensiune validă.";
    if (z === "") return "Locația / zona hub este obligatorie.";
    if (z.length > ZONA_MAX) return `Locația poate avea maximum ${ZONA_MAX} de caractere.`;
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
        zone: zone.trim(),
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
    <form className={styles.lockerForm} onSubmit={handleSubmit} noValidate data-testid="form">
      <label>
        Denumire Locker / Stație
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: LOCKER B-402 (HUB VIRTUTII)"
          maxLength={NUME_MAX}
          aria-invalid={Boolean(eroare) && name.trim() === ""}
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
          {MARIMI_LOCKER.map((m) => (
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
          maxLength={ZONA_MAX}
          aria-invalid={Boolean(eroare) && zone.trim() === ""}
          data-testid="form-zone"
        />
      </label>

      {eroare && (
        <p className={styles.formErrorMsg} data-testid="form-error">
          ⚠️ {eroare}
        </p>
      )}

      <button
        type="submit"
        disabled={trimite}
        className={styles.btnSubmit}
        data-testid="form-submit"
      >
        {trimite ? "Se salvează..." : "Adaugă Locker în Rețea ➕"}
      </button>
    </form>
  );
}