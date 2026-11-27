
// Teste automate fără dependențe suplimentare: node --test
import { after, before, describe, test } from "node:test";
import assert from "node:assert/strict";
import app from "../src/app.js";

let server;
let base;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });
  base = `http://localhost:${server.address().port}`;
});

after(() => server.close());

async function call(path, options = {}) {
  const res = await fetch(`${base}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  const text = await res.text();
  return { status: res.status, body: text ? JSON.parse(text) : null, res };
}

const post = (body) => call("/lockers", { method: "POST", body: JSON.stringify(body) });

describe("API /lockers", () => {
  test("GET /health răspunde ok", async () => {
    const r = await call("/health");
    assert.equal(r.status, 200);
    assert.deepEqual(r.body, { status: "ok" });
  });

  test("GET /lockers întoarce lista (200)", async () => {
    const r = await call("/lockers");
    assert.equal(r.status, 200);
    assert.ok(Array.isArray(r.body) && r.body.length >= 3);
  });

  test("ciclul complet: POST 201, GET 200, PATCH 200, DELETE 204, GET 404", async () => {
    // Elementul trimis de verificator: tw.json (title = name, done = rented, sample)
    const created = await post({
      name: "Din test",
      rented: false,
      size: "medium",
      zone: "București Depot",
    });
    assert.equal(created.status, 201);
    assert.equal(created.body.name, "Din test");
    assert.equal(created.body.rented, false);
    assert.ok(Number.isInteger(created.body.id));
    assert.deepEqual(Object.keys(created.body.slots).sort(), ["large", "medium", "small"]);

    const id = created.body.id;
    assert.equal((await call(`/lockers/${id}`)).status, 200);

    const patched = await call(`/lockers/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ rented: true }),
    });
    assert.equal(patched.status, 200);
    assert.equal(patched.body.rented, true);
    assert.equal(patched.body.name, "Din test"); // restul câmpurilor rămân

    assert.equal((await call(`/lockers/${id}`, { method: "DELETE" })).status, 204);
    const dupa = await call(`/lockers/${id}`);
    assert.equal(dupa.status, 404);
    assert.deepEqual(dupa.body, { error: "Lockerul nu există" });
  });

  test("POST cu obiect gol sau name gol → 400 cu { error }", async () => {
    for (const body of [{}, { name: "" }, { name: "   " }, { name: 5 }]) {
      const r = await post(body);
      assert.equal(r.status, 400, JSON.stringify(body));
      assert.equal(typeof r.body.error, "string");
    }
  });

  test("POST fără corp → 400 (nu 500)", async () => {
    const r = await call("/lockers", { method: "POST" });
    assert.equal(r.status, 400);
  });

  test("POST cu JSON stricat → 400 cu { error }", async () => {
    const r = await call("/lockers", { method: "POST", body: "{nu e json" });
    assert.equal(r.status, 400);
    assert.equal(typeof r.body.error, "string");
  });

  test("valori invalide pentru size, zone, rented, slots → 400", async () => {
    const invalide = [
      { name: "x", size: "huge" },
      { name: "x", zone: "   " },
      { name: "x", zone: 7 },
      { name: "x", rented: "da" },
      { name: "x", slots: { small: -1 } },
      { name: "x", slots: { medium: 1.5 } },
      { name: "x", slots: "multe" },
      { name: "a".repeat(101) },
    ];
    for (const body of invalide) {
      const r = await post(body);
      assert.equal(r.status, 400, JSON.stringify(body));
    }
  });

  test("lista albă: id și câmpurile necunoscute sunt ignorate", async () => {
    const r = await post({ name: "Alb", id: 999, user_id: 1, isAdmin: true });
    assert.equal(r.status, 201);
    assert.notEqual(r.body.id, 999);
    assert.equal(r.body.user_id, undefined);
    assert.equal(r.body.isAdmin, undefined);
  });

  test("id invalid → 400, id inexistent → 404, rută necunoscută → 404", async () => {
    assert.equal((await call("/lockers/abc")).status, 400);
    assert.equal((await call("/lockers/1.5")).status, 400);
    assert.equal((await call("/lockers/0")).status, 400);
    assert.equal((await call("/lockers/999999")).status, 404);
    const r = await call("/nu-exista");
    assert.equal(r.status, 404);
    assert.deepEqual(r.body, { error: "Ruta nu există" });
  });

  test("PATCH cu valoare invalidă → 400, iar elementul rămâne neschimbat", async () => {
    const before = (await call("/lockers/1")).body;
    const r = await call("/lockers/1", {
      method: "PATCH",
      body: JSON.stringify({ size: "gigant" }),
    });
    assert.equal(r.status, 400);
    assert.deepEqual((await call("/lockers/1")).body, before);
  });

  test("CORS: originea frontendului este permisă, inclusiv la preflight", async () => {
    const origin = "http://localhost:5173";
    const r = await call("/lockers", { headers: { Origin: origin } });
    assert.equal(r.res.headers.get("access-control-allow-origin"), origin);

    const pre = await fetch(`${base}/lockers/1`, {
      method: "OPTIONS",
      headers: {
        Origin: origin,
        "Access-Control-Request-Method": "PATCH",
        "Access-Control-Request-Headers": "content-type",
      },
    });
    assert.equal(pre.status, 204);
    assert.equal(pre.headers.get("access-control-allow-origin"), origin);
    assert.match(pre.headers.get("access-control-allow-methods"), /PATCH/);
    assert.match(pre.headers.get("access-control-allow-methods"), /DELETE/);
  });
});
