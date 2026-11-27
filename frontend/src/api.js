// Toate cererile HTTP stau aici; componentele nu apelează fetch direct.
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

// Funcție comună: trimite JSON și aruncă eroare dacă răspunsul nu este 2xx
async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });

  if (!res.ok) {
    // API-ul propriu răspunde cu { error: "..." }
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Eroare server: ${res.status}`);
  }

  // Tratăm cazurile de 204 No Content
  return res.status === 204 ? null : res.json();
}

export function fetchLockers() {
  return request("/lockers");
}

export function createLocker(locker) {
  return request("/lockers", {
    method: "POST",
    body: JSON.stringify(locker)
  });
}

export function updateLocker(id, changes) {
  return request(`/lockers/${id}`, {
    method: "PATCH",
    body: JSON.stringify(changes)
  });
}

export function deleteLocker(id) {
  return request(`/lockers/${id}`, {
    method: "DELETE"
  });
}

export function fetchLocker(id) {
  return request(`/lockers/${id}`);
}