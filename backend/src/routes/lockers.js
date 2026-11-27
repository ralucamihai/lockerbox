import { Router } from "express";
import { SLOTS_IMPLICITE, parseId, valideazaLocker } from "../validation.js";

const router = Router();

// Etapa 9: datele stau în memorie și se pierd la repornire (Etapa 10 le mută în MariaDB)
let lockers = [
  {
    id: 1,
    name: "LOCKER B-101 (DEPOT OTOPENI)",
    rented: false,
    size: "large",
    zone: "DNCB Km 14 • Stație Colete Otopeni",
    slots: { small: 5, medium: 2, large: 1 },
  },
  {
    id: 2,
    name: "LOCKER B-204 (HUB MILITARI)",
    rented: true,
    size: "medium",
    zone: "Ieșire A1 • Militari Shopping Center",
    slots: { small: 0, medium: 1, large: 3 },
  },
  {
    id: 3,
    name: "LOCKER B-007 (PUNCT UNIRII)",
    rented: false,
    size: "small",
    zone: "Hub Central • Piața Unirii MP 0",
    slots: { small: 8, medium: 4, large: 0 },
  },
  {
    id: 4,
    name: "LOCKER B-309 (STATION BĂNEASA)",
    rented: false,
    size: "medium",
    zone: "DN1 • Băneasa Shopping City",
    slots: { small: 3, medium: 5, large: 2 },
  },
  {
    id: 5,
    name: "LOCKER B-512 (TERMINAL TITAN)",
    rented: true,
    size: "large",
    zone: "Bd. Theodor Pallady • Hub Titan",
    slots: { small: 2, medium: 0, large: 1 },
  },
];
let nextId = 6;

// Validează :id și găsește elementul, sau răspunde cu 400 / 404
function gasesteIndex(req, res) {
  const id = parseId(req.params.id);
  if (!id) {
    res.status(400).json({ error: "Id invalid" });
    return -1;
  }
  const index = lockers.findIndex((l) => l.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Lockerul nu există" });
  }
  return index;
}

// GET /lockers
router.get("/", (req, res) => {
  res.json(lockers);
});

// GET /lockers/:id
router.get("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  res.json(lockers[index]);
});

// POST /lockers
router.post("/", (req, res) => {
  const { erori, date } = valideazaLocker(req.body ?? {});
  if (erori.length > 0) {
    return res.status(400).json({ error: erori.join("; ") });
  }
  // Doar câmpurile validate ajung în obiect (lista albă); id-ul îl pune serverul
  const locker = {
    id: nextId++,
    name: date.name,
    rented: date.rented,
    size: date.size,
    zone: date.zone,
    slots: { ...SLOTS_IMPLICITE, ...date.slots },
  };
  lockers.push(locker);
  res.status(201).json(locker);
});

// PATCH /lockers/:id (modificare parțială)
router.patch("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  const { erori, date } = valideazaLocker(req.body ?? {}, { partial: true });
  if (erori.length > 0) {
    return res.status(400).json({ error: erori.join("; ") });
  }
  const curent = lockers[index];
  lockers[index] = {
    ...curent,
    ...date,
    slots: { ...curent.slots, ...date.slots },
  };
  res.json(lockers[index]);
});

// DELETE /lockers/:id
router.delete("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  lockers.splice(index, 1);
  res.status(204).end();
});

export default router;
