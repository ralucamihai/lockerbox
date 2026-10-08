// ==========================================
// ETAPA 2: Logica pe date (JavaScript)
// LockerBox Depot
// ==========================================

// 1. Constante și date inițiale de test (din README)
const SIZES = ["small", "medium", "large"];

const lockers = [
  { id: 1, name: "Locker A-101", rented: false, size: "large" },
  { id: 2, name: "Locker B-204", rented: true, size: "medium" },
  { id: 3, name: "Locker C-007", rented: false, size: "small" }
];

// 2. Funcție de listare a numelor (folosește .map)
function listeazaNume(lista) {
  return lista.map((item) => item.name);
}

// 3. Funcție de numărare a lockerelor active / libere (folosește .filter)
function numaraLibere(lista) {
  return lista.filter((item) => !item.rented).length;
}

// 4. Funcție de căutare după nume fără case-sensitivity (folosește .filter)
function cautaDupaNume(lista, text) {
  const textCurat = text.toLowerCase();
  return lista.filter((item) => item.name.toLowerCase().includes(textCurat));
}

// 5. Calcularea următorului ID unic (folosește .reduce)
function nextId(lista) {
  return lista.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

// 6. Adăugarea unui locker nou cu validare și imutabilitate
function adaugaLocker(lista, name, size = "medium") {
  const numeCurat = name ? name.trim() : "";

  // Validare 1: numele nu poate fi gol
  if (!numeCurat) {
    console.warn("Eroare validare: Numele lockerului nu poate fi gol.");
    return lista;
  }

  // Validare 2: dimensiunea trebuie să fie permisă
  if (!SIZES.includes(size)) {
    console.warn(`Eroare validare: Dimensiunea '${size}' este invalidă. Valori permise: ${SIZES.join(", ")}`);
    return lista;
  }

  // Crearea noului obiect
  const lockerNou = {
    id: nextId(lista),
    name: numeCurat,
    rented: false,
    size: size
  };

  // Returnăm un array nou (fără a modifica parametrul lista primit)
  return [...lista, lockerNou];
}

// 7. Comutarea stării (rented: true <-> false) folosind .map
function comutaStare(lista, id) {
  return lista.map((item) =>
    item.id === id ? { ...item, rented: !item.rented } : item
  );
}

// 8. Ștergerea unui element după id folosind .filter
function stergeLocker(lista, id) {
  return lista.filter((item) => item.id !== id);
}

// ==========================================
// TESTE ÎN CONSOLĂ (verificabile cu F12)
// ==========================================

console.log("--- Citire ---");
console.log("Nume lockere:", listeazaNume(lockers).join(", "));
console.log("Lockere libere:", numaraLibere(lockers));
console.log("Căutare 'a-101':", listeazaNume(cautaDupaNume(lockers, "a-101")).join(", "));

console.log("--- Adăugare ---");
let listaNoua = adaugaLocker(lockers, "Locker D-302", "large");
console.log("Lista nouă:", listaNoua.length, "lockere");
console.log("Originalul a rămas cu:", lockers.length, "lockere"); // Demonstrează imutabilitatea

console.log("--- Modificare și ștergere ---");
listaNoua = comutaStare(listaNoua, 1);
console.log("După ocuparea id 1, libere:", numaraLibere(listaNoua));
listaNoua = stergeLocker(listaNoua, 3);
console.log("După ștergerea id 3:", listeazaNume(listaNoua).join(", "));

console.log("--- Validare ---");
adaugaLocker(listaNoua, "");
adaugaLocker(listaNoua, "Locker Trailer", "extra-large");