// Valorile fixe și etichetele lor, într-un singur loc.
export const MARIMI_LOCKER = [
  { value: "small", label: "S • Plicuri & Gadgeturi" },
  { value: "medium", label: "M • Cutii Medii / Haine" },
  { value: "large", label: "L • Colete Mari / Voluminoase" },
];

export const ETICHETE_MARIME = Object.fromEntries(
  MARIMI_LOCKER.map((m) => [m.value, m.label])
);
