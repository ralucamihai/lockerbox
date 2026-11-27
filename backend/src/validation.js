// Validare pe server: datele de la client nu sunt niciodată de încredere.
// Valorile fixe trebuie să fie identice cu cele din frontend/src/constants.js.
export const MARIMI = ["small", "medium", "large"];

const NUME_MAX = 100;
const ZONA_MAX = 100;
const SLOT_MAX = 999;
const CHEI_SLOTS = ["small", "medium", "large"];

// Valori folosite când clientul nu trimite câmpul la crearea unui locker
const MARIME_IMPLICITA = "medium";
const ZONA_IMPLICITA = "București Depot";
export const SLOTS_IMPLICITE = { small: 3, medium: 2, large: 1 };

function esteObiect(valoare) {
  return typeof valoare === "object" && valoare !== null && !Array.isArray(valoare);
}

// partial = true pentru PATCH (se verifică doar câmpurile trimise)
export function valideazaLocker(body, { partial = false } = {}) {
  const erori = [];
  const date = {};

  if (!esteObiect(body)) {
    return { erori: ["corpul cererii trebuie să fie un obiect JSON"], date };
  }

  // name: obligatoriu la creare
  if (!partial || body.name !== undefined) {
    if (typeof body.name !== "string" || body.name.trim() === "") {
      erori.push("name este obligatoriu");
    } else if (body.name.trim().length > NUME_MAX) {
      erori.push(`name are maximum ${NUME_MAX} de caractere`);
    } else {
      date.name = body.name.trim();
    }
  }

  // size: una dintre valorile fixe
  if (!partial || body.size !== undefined) {
    const s = body.size === undefined ? MARIME_IMPLICITA : body.size;
    if (!MARIMI.includes(s)) {
      erori.push(`size trebuie să fie una din: ${MARIMI.join(", ")}`);
    } else {
      date.size = s;
    }
  }

  // zone: text nevid
  if (!partial || body.zone !== undefined) {
    const z = body.zone === undefined ? ZONA_IMPLICITA : body.zone;
    if (typeof z !== "string" || z.trim() === "") {
      erori.push("zone nu poate fi goală");
    } else if (z.trim().length > ZONA_MAX) {
      erori.push(`zone are maximum ${ZONA_MAX} de caractere`);
    } else {
      date.zone = z.trim();
    }
  }

  // rented: boolean; la creare este false dacă lipsește
  if (body.rented !== undefined) {
    if (typeof body.rented !== "boolean") {
      erori.push("rented trebuie să fie true sau false");
    } else {
      date.rented = body.rented;
    }
  } else if (!partial) {
    date.rented = false;
  }

  // slots: opțional; fiecare cheie trimisă trebuie să fie un număr întreg 0..SLOT_MAX
  if (body.slots !== undefined) {
    if (!esteObiect(body.slots)) {
      erori.push("slots trebuie să fie un obiect { small, medium, large }");
    } else {
      const slots = {};
      for (const cheie of CHEI_SLOTS) {
        const v = body.slots[cheie];
        if (v === undefined) continue;
        if (!Number.isInteger(v) || v < 0 || v > SLOT_MAX) {
          erori.push(`slots.${cheie} trebuie să fie un număr întreg între 0 și ${SLOT_MAX}`);
        } else {
          slots[cheie] = v;
        }
      }
      date.slots = slots;
    }
  }

  return { erori, date };
}

// Id-urile din adresă vin ca text; se acceptă doar numere întregi pozitive
export function parseId(value) {
  if (!/^[1-9]\d*$/.test(value)) return null;
  const id = Number(value);
  return Number.isSafeInteger(id) ? id : null;
}
