# LockerBox Bucharest

A web application for managing parcel storage lockers across Bucharest delivery hubs and transit routes (DNCB Ring Road, A1, A2, A3, City Center). Users and courier staff can monitor which lockers are **FREE** or **OCCUPIED**, track parcel status, and inspect real-time compartment availability by box size (**S**, **M**, **L**).

## Data model

| Field | Type | Notes | 
| ----- | ----- | ----- | 
| name | text | required, max 100 chars (e.g. Locker B-101) | 
| rented | boolean | toggled from the list, default false (FREE / OCCUPIED) | 
| size | fixed values | small (S • Plicuri & Gadgeturi), medium (M • Cutii Medii / Haine), large (L • Colete Mari / Voluminoase) | 
| zone | relation | Bucharest hubs: Otopeni, Militari Shopping, Unirii MP 0 | 
| slots | object | available compartment count per size (`{ small, medium, large }`) | 
| user | relation | recipient / parcel owner (from week 11) | 

Sample data used across all stages:

1. Locker B-101 (DEPOT OTOPENI), free, large, slots: S:5, M:2, L:1
2. Locker B-204 (HUB MILITARI), occupied, medium, slots: S:0, M:1, L:3
3. Locker B-007 (PUNCT UNIRII), free, small, slots: S:8, M:4, L:0

## Pages

`index.html` contains four tabs styled as highway exit signs:

* **Exit 1**: the parcel locker list
* **Exit 2**: the add-locker form
* **Exit 3**: a live dashboard
* **Exit 4**: the locker rules page

## How to run

Open `index.html` in a browser. No build step, no server.
Alternatively, run `npx live-server` in the terminal.

For Stages 3 to 8 the app is a React + Vite + React Router frontend; since Stage 9 it talks to its own Express backend (no more json-server).
Run these in two terminal windows (install dependencies first with `npm install` in each folder):

```bash
# Terminal 1: Express API on port 3001
cd backend
npm install
npm run dev

# Terminal 2: Vite development server on port 5173
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser. Check that the API is up with `http://localhost:3001/health`.

## Stage 2: data logic

Plain JavaScript, no DOM. `lockere.js` holds the array and functions that manage parcel data. Results are printed in the browser console (F12).

## Stage 3: Vite and React project

Initialized Vite + React inside `frontend/`, organized static mockups into `mockup/`, cleaned up demo files, adapted `App.css` and `main.jsx`, and displayed raw JSON data in the theme layout.

## Stage 4: components

The list is rendered from parcel data through two components:
* `LockerList` receives the whole array and renders one card per locker
* `LockerCard` receives a single item through props and displays its details

## Stage 5: local state and events

The list lives in React state (`useState`). Checking/toggling parcel pickup status and deleting stations work directly from the page. Counters in the header and compartment availability badges follow automatically. A button in the header switches between Day mode and Night mode.

## Stage 6: data from a mock API

The list is served by `json-server@0.17.4` from `frontend/db.json` on endpoint `/lockers`. On page load, `useEffect` triggers `fetchLockers()` in `src/api.js`. Handles `loading` and explicit `error` states gracefully when the API server is unavailable.

## Stage 7: form and validation

Lockers can be created directly from the page using a controlled, validated form. All operations (add, toggle status, delete) send HTTP requests to `json-server` mock API before updating the frontend state, making changes persistent across page reloads. Automated test markers (`tw.json` and `data-testid`) are configured.

## Stage 8: routing and detail page

The app is split into pages with React Router: the locker list (`/`), a detail page for each locker (`/lockers/:id`), a dashboard (`/dashboard`), a rules page (`/regulament`), an about page (`/despre`) and a 404 page for unknown addresses. A shared `Layout` (header, `NavLink` navigation, footer, day/night button) wraps every page through `<Outlet />`. The detail page reads the id with `useParams()` and requests exactly that locker from the API (`fetchLocker(id)`); a missing id shows an error message and a link back. Component styles moved to CSS Modules (`*.module.css` next to each component); `index.css` keeps only the color variables, the shared background and the common classes.

## Stage 9: own backend

json-server is gone. The API is an Express server in `backend/`, with REST routes, server-side validation and CORS. Data is still kept in memory (the five lockers from the old `db.json` are the starting data) and resets on restart; Stage 10 moves it to MariaDB.

| Route | Answer |
| ----- | ----- |
| `GET /lockers` | 200, the list |
| `GET /lockers/:id` | 200, one locker; 400 for an invalid id, 404 if it does not exist |
| `POST /lockers` | 201 with the new locker (id given by the server); 400 for invalid data |
| `PATCH /lockers/:id` | 200 with the updated locker; 400 / 404 |
| `DELETE /lockers/:id` | 204, no body; 404 if it does not exist |
| `GET /health` | 200, `{ "status": "ok" }` |

Every error has the same shape, `{ "error": "..." }`, and the frontend shows that message (`api.js` reads `body.error`). The server validates everything it receives (`backend/src/validation.js`): `name` is required (max 100 chars), `size` must be `small`, `medium` or `large` (same values as `frontend/src/constants.js`), `zone` cannot be empty, `rented` must be a boolean, `slots` must hold whole numbers from 0 to 999. Only these known fields are saved, anything else the client sends (for example `id`) is ignored. CORS allows the origin from `CORS_ORIGIN` (default `http://localhost:5173`); see `backend/.env.example`. `app.js` builds the application and `server.js` only opens the port, so the app can be tested without taking a port.

The frontend barely changed: `api.js` reads the server's error message, `db.json`, the `npm run api` script and the `json-server` package were removed, and the form validation from Stage 7 now checks every field (name, size, zone), not only the name.

Try the API from the terminal (Git Bash, WSL or macOS/Linux):

```bash
curl -s -w ' -> %{http_code}\n' http://localhost:3001/lockers
curl -s -w ' -> %{http_code}\n' -X POST http://localhost:3001/lockers \
  -H "Content-Type: application/json" \
  -d '{"name":"Din curl","size":"medium","zone":"București Depot"}'
curl -s -w ' -> %{http_code}\n' -X POST http://localhost:3001/lockers \
  -H "Content-Type: application/json" -d '{"name":""}'
curl -s -w ' -> %{http_code}\n' http://localhost:3001/lockers/999
curl -s -w ' -> %{http_code}\n' -X DELETE http://localhost:3001/lockers/6
```

Automated API tests (no extra dependencies): `cd backend && npm test`.

## AI usage

| Tool | Used for | 
| ----- | ----- | 
| Claude | HTML/CSS structure and explanations, README and AI log (stage 1), Express backend, server-side validation, API tests and the form validation fix (stage 9) | 
| Gemini | Permalinks guidance (stage 1), data logic implementation, immutable array functions (stage 2), Vite setup, React components, props architecture, local state, event handling, mock REST API integration, controlled form validation & full CRUD setup (stages 3-7), React Router pages, detail page and CSS Modules (stage 8) | 

Details per stage: see the `ai-log/` folder.

## Status

* [x] Stage 1: static mockup
* [x] Stage 2: data logic in JavaScript
* [x] Stage 3: Vite and React project
* [x] Stage 4: components rendered from data
* [x] Stage 5: local state and events
* [x] Stage 6: data from a mock API
* [x] Stage 7: form and validation
* [x] Stage 8: routing and detail page
* [x] Stage 9: own backend with Express
* [ ] Stage 10: MariaDB and full CRUD

## Checklist - Stage 1

| ID | Requirement | Where (permalink) | How to check | 
| ----- | ----- | ----- | ----- | 
| S1-R1 | README: description, fields, sample data, how to run | [README.md](https://github.com/ralucamihai/lockerbox/blob/cac12e405578e97aedd5499b438ea59e8a2a1ae5/README.md) | read | 
| S1-R2 | AI usage section | [README.md](https://github.com/ralucamihai/lockerbox/blob/cac12e405578e97aedd5499b438ea59e8a2a1ae5/README.md) | read | 
| S1-R3 | AI log for stage 1 | [ai-log/etapa-01.md](https://github.com/ralucamihai/lockerbox/blob/cac12e405578e97aedd5499b438ea59e8a2a1ae5/ai-log/etapa-01.md) | read | 
| S1-R4 | header, form (text + select), 3 cards with own data | [header L37-L48](https://github.com/ralucamihai/lockerbox/blob/cac12e405578e97aedd5499b438ea59e8a2a1ae5/index.html#L37-L48), [form L147-L177](https://github.com/ralucamihai/lockerbox/blob/cac12e405578e97aedd5499b438ea59e8a2a1ae5/index.html#L147-L177), [cards L81-L135](https://github.com/ralucamihai/lockerbox/blob/cac12e405578e97aedd5499b438ea59e8a2a1ae5/index.html#L81-L135) | open the page (form is on the "Exit 2" tab) | 
| S1-R5 | finished card looks different | [index.html L101-L116](https://github.com/ralucamihai/lockerbox/blob/cac12e405578e97aedd5499b438ea59e8a2a1ae5/index.html#L101-L116), [style.css L507-L510 (.done)](https://github.com/ralucamihai/lockerbox/blob/cac12e405578e97aedd5499b438ea59e8a2a1ae5/style.css#L507-L510) | look at card Locker B-204 (struck through) | 
| S1-R6 | 2 columns on desktop, 1 under 700px | [style.css L706-L726 (@media)](https://github.com/ralucamihai/lockerbox/blob/cac12e405578e97aedd5499b438ea59e8a2a1ae5/style.css#L706-L726) | resize the window under 768px | 
| S1-R7 | visible focus, readable dark theme | [focus L548-L553](https://github.com/ralucamihai/lockerbox/blob/cac12e405578e97aedd5499b438ea59e8a2a1ae5/style.css#L548-L553), [:root L9-L26](https://github.com/ralucamihai/lockerbox/blob/cac12e405578e97aedd5499b438ea59e8a2a1ae5/style.css#L9-L26) | Tab on the form fields; page is dark-only | 
| S1-R8 | commit "Stage 1" pushed | [commit cac12e4](https://github.com/ralucamihai/lockerbox/commit/cac12e405578e97aedd5499b438ea59e8a2a1ae5) | commit history | 

## Checklist - Stage 2

| ID | Requirement | Where (permalink) | How to check | 
| ----- | ----- | ----- | ----- | 
| S2-R1 | JS file linked, logs on page load | [mockup/index.html](https://github.com/ralucamihai/lockerbox/blob/main/mockup/index.html) | open page, F12 | 
| S2-R2 | 3+ items with id, name, state, tag | [mockup/lockere.js](https://github.com/ralucamihai/lockerbox/blob/main/mockup/lockere.js) | read | 
| S2-R3 | list, count, search, add, toggle, delete | [mockup/lockere.js](https://github.com/ralucamihai/lockerbox/blob/main/mockup/lockere.js) | console output | 
| S2-R4 | add rejects empty name and invalid tag | [mockup/lockere.js](https://github.com/ralucamihai/lockerbox/blob/main/mockup/lockere.js) | last 2 console lines | 
| S2-R5 | original array unchanged after add | [mockup/lockere.js](https://github.com/ralucamihai/lockerbox/blob/main/mockup/lockere.js) | console line | 
| S2-R6 | README Stage 2 section + AI log | [README.md](https://github.com/ralucamihai/lockerbox/blob/main/README.md), [ai-log/etapa-02.md](https://github.com/ralucamihai/lockerbox/blob/main/ai-log/etapa-02.md) | read | 
| S2-R7 | commit "Stage 2" pushed | [Commits](https://github.com/ralucamihai/lockerbox/commits/main) | commit history | 

## Checklist - Stage 3

| ID | Requirement | Where (permalink) | How to check | 
| ----- | ----- | ----- | ----- | 
| S3-R1 | project initialized with Vite + React | [frontend/package.json](https://github.com/ralucamihai/lockerbox/blob/main/frontend/package.json) | read dependencies | 
| S3-R2 | old mockups moved to mockup/ | [mockup/](https://github.com/ralucamihai/lockerbox/tree/main/mockup) | open folder | 
| S3-R3 | demo files cleaned | [frontend/src/](https://github.com/ralucamihai/lockerbox/tree/main/frontend/src) | open folder | 
| S3-R4 | main.jsx and App.css adapted | [main.jsx](https://github.com/ralucamihai/lockerbox/blob/main/frontend/src/main.jsx), [App.css](https://github.com/ralucamihai/lockerbox/blob/main/frontend/src/App.css) | read | 
| S3-R5 | raw JSON data displayed in App.jsx | [App.jsx](https://github.com/ralucamihai/lockerbox/blob/main/frontend/src/App.jsx) | run app | 
| S3-R6 | README Stage 3 section + AI log | [README.md](https://github.com/ralucamihai/lockerbox/blob/main/README.md), [ai-log/etapa-03.md](https://github.com/ralucamihai/lockerbox/blob/main/ai-log/etapa-03.md) | read | 
| S3-R7 | commit "Stage 3" pushed | [Commits](https://github.com/ralucamihai/lockerbox/commits/main) | commit history | 

## Checklist - Stage 4

| ID | Requirement | Where (permalink) | How to check | 
| ----- | ----- | ----- | ----- | 
| S4-R1 | 2+ components in src/components/ | [src/components/](https://github.com/ralucamihai/lockerbox/tree/main/frontend/src/components) | open folder | 
| S4-R2 | card receives data through props | [LockerCard.jsx](https://github.com/ralucamihai/lockerbox/blob/main/frontend/src/components/LockerCard.jsx) | read | 
| S4-R3 | map + key={id}, no console warnings | [LockerList.jsx](https://github.com/ralucamihai/lockerbox/blob/main/frontend/src/components/LockerList.jsx) | F12, Console | 
| S4-R4 | message for empty list | [LockerList.jsx](https://github.com/ralucamihai/lockerbox/blob/main/frontend/src/components/LockerList.jsx) | set array to [] | 
| S4-R5 | state changes the card look | [LockerCard.jsx](https://github.com/ralucamihai/lockerbox/blob/main/frontend/src/components/LockerCard.jsx) | toggle rented flag | 
| S4-R6 | README Stage 4 section + AI log | [README.md](https://github.com/ralucamihai/lockerbox/blob/main/README.md), [ai-log/etapa-04.md](https://github.com/ralucamihai/lockerbox/blob/main/ai-log/etapa-04.md) | read | 
| S4-R7 | commit "Stage 4" pushed | [Commits](https://github.com/ralucamihai/lockerbox/commits/main) | commit history | 

## Checklist - Stage 5

| ID | Requirement | Where (permalink) | How to check | 
| ----- | ----- | ----- | ----- | 
| S5-R1 | list kept in useState, in App | [App.jsx](https://github.com/ralucamihai/lockerbox/blob/main/frontend/src/App.jsx) | read | 
| S5-R2 | toggling changes state and card look | [App.jsx](https://github.com/ralucamihai/lockerbox/blob/main/frontend/src/App.jsx), [LockerCard.jsx](https://github.com/ralucamihai/lockerbox/blob/main/frontend/src/components/LockerCard.jsx) | click a checkbox | 
| S5-R3 | delete removes the item | [App.jsx](https://github.com/ralucamihai/lockerbox/blob/main/frontend/src/App.jsx), [LockerCard.jsx](https://github.com/ralucamihai/lockerbox/blob/main/frontend/src/components/LockerCard.jsx) | click Delete | 
| S5-R4 | header counter derived, not in state | [App.jsx](https://github.com/ralucamihai/lockerbox/blob/main/frontend/src/App.jsx) | toggle, watch header | 
| S5-R5 | immutable updates (no push, splice, assignment) | [App.jsx](https://github.com/ralucamihai/lockerbox/blob/main/frontend/src/App.jsx) | read | 
| S5-R6 | light/dark toggle: state + data-theme on html | [App.jsx](https://github.com/ralucamihai/lockerbox/blob/main/frontend/src/App.jsx), [App.css](https://github.com/ralucamihai/lockerbox/blob/main/frontend/src/App.css) | click the button, both system themes | 
| S5-R7 | no console warnings; README + AI log | [README.md](https://github.com/ralucamihai/lockerbox/blob/main/README.md), [ai-log/etapa-05.md](https://github.com/ralucamihai/lockerbox/blob/main/ai-log/etapa-05.md) | F12, Console | 
| S5-R8 | commit "Stage 5" pushed | [Commits](https://github.com/ralucamihai/lockerbox/commits/main) | commit history | 

## Checklist - Stage 6

| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S6-R1 | npm run api starts, route shows JSON | [package.json](https://github.com/ralucamihai/lockerbox/blob/58af7a5e36c3041b2a545e52749e7706b66f5fdf/frontend/package.json), [db.json](https://github.com/ralucamihai/lockerbox/blob/58af7a5e36c3041b2a545e52749e7706b66f5fdf/frontend/db.json) | open localhost:3001/lockers |
| S6-R2 | data no longer in React code | [App.jsx](https://github.com/ralucamihai/lockerbox/blob/58af7a5e36c3041b2a545e52749e7706b66f5fdf/frontend/src/App.jsx) | read |
| S6-R3 | loading message while waiting | [App.jsx](https://github.com/ralucamihai/lockerbox/blob/58af7a5e36c3041b2a545e52749e7706b66f5fdf/frontend/src/App.jsx), [api.js](https://github.com/ralucamihai/lockerbox/blob/58af7a5e36c3041b2a545e52749e7706b66f5fdf/frontend/src/api.js) | --delay 4000 |
| S6-R4 | error message when API is down | [App.jsx](https://github.com/ralucamihai/lockerbox/blob/58af7a5e36c3041b2a545e52749e7706b66f5fdf/frontend/src/App.jsx) | stop npm run api, refresh |
| S6-R5 | fetch only in api.js, URL from env | [api.js](https://github.com/ralucamihai/lockerbox/blob/58af7a5e36c3041b2a545e52749e7706b66f5fdf/frontend/src/api.js), [.env.example](https://github.com/ralucamihai/lockerbox/blob/58af7a5e36c3041b2a545e52749e7706b66f5fdf/frontend/.env.example) | search for fetch |
| S6-R6 | README Stage 6 section + AI log | [README.md](https://github.com/ralucamihai/lockerbox/blob/58af7a5e36c3041b2a545e52749e7706b66f5fdf/README.md), [ai-log/etapa-06.md](https://github.com/ralucamihai/lockerbox/blob/58af7a5e36c3041b2a545e52749e7706b66f5fdf/ai-log/etapa-06.md) | read |
| S6-R7 | commit "Stage 6" pushed | [Commit Link](https://github.com/ralucamihai/lockerbox/commit/58af7a5e36c3041b2a545e52749e7706b66f5fdf) | commit history |

## Checklist - Stage 7

| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S7-R1 | controlled form: value + onChange on every field | [LockerForm.jsx](https://github.com/ralucamihai/lockerbox/blob/58af7a5e36c3041b2a545e52749e7706b66f5fdf/frontend/src/components/LockerForm.jsx) | read |
| S7-R2 | empty title shows an error, nothing is sent | [LockerForm.jsx](https://github.com/ralucamihai/lockerbox/blob/58af7a5e36c3041b2a545e52749e7706b66f5fdf/frontend/src/components/LockerForm.jsx) | submit empty, watch Network |
| S7-R3 | added item shows in the list and survives refresh | [App.jsx](https://github.com/ralucamihai/lockerbox/blob/58af7a5e36c3041b2a545e52749e7706b66f5fdf/frontend/src/App.jsx), [api.js](https://github.com/ralucamihai/lockerbox/blob/58af7a5e36c3041b2a545e52749e7706b66f5fdf/frontend/src/api.js) | add item, refresh |
| S7-R4 | toggle and delete survive refresh | [App.jsx](https://github.com/ralucamihai/lockerbox/blob/58af7a5e36c3041b2a545e52749e7706b66f5fdf/frontend/src/App.jsx) | toggle/delete, refresh |
| S7-R5 | button disabled while sending, form cleared only on success | [LockerForm.jsx](https://github.com/ralucamihai/lockerbox/blob/58af7a5e36c3041b2a545e52749e7706b66f5fdf/frontend/src/components/LockerForm.jsx) | submit item, check network delay |
| S7-R6 | tw.json and the data-testid attributes | [tw.json](https://github.com/ralucamihai/lockerbox/blob/58af7a5e36c3041b2a545e52749e7706b66f5fdf/tw.json), [LockerCard.jsx](https://github.com/ralucamihai/lockerbox/blob/58af7a5e36c3041b2a545e52749e7706b66f5fdf/frontend/src/components/LockerCard.jsx) | inspect console |
| S7-R7 | README Stage 7 section + AI log | [README.md](https://github.com/ralucamihai/lockerbox/blob/58af7a5e36c3041b2a545e52749e7706b66f5fdf/README.md), [ai-log/etapa-07.md](https://github.com/ralucamihai/lockerbox/blob/58af7a5e36c3041b2a545e52749e7706b66f5fdf/ai-log/etapa-07.md) | read |
| S7-R8 | commit "Stage 7" pushed | [Commit Link](https://github.com/ralucamihai/lockerbox/commit/58af7a5e36c3041b2a545e52749e7706b66f5fdf) | commit history |

## Checklist - Stage 8

| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S8-R1 | header navigation changes page without reload | [App.jsx](https://github.com/ralucamihai/lockerbox/blob/9f4907e730547741c36bb7f8106d3920af199823/frontend/src/App.jsx), [Layout.jsx](https://github.com/ralucamihai/lockerbox/blob/9f4907e730547741c36bb7f8106d3920af199823/frontend/src/components/Layout.jsx) | click links, watch Network |
| S8-R2 | click on an item opens its detail page | [LockerCard.jsx](https://github.com/ralucamihai/lockerbox/blob/9f4907e730547741c36bb7f8106d3920af199823/frontend/src/components/LockerCard.jsx), [LockerDetaliuPage.jsx](https://github.com/ralucamihai/lockerbox/blob/9f4907e730547741c36bb7f8106d3920af199823/frontend/src/pages/LockerDetaliuPage.jsx) | click a title |
| S8-R3 | refresh on the detail URL works; missing id shows an error | [LockerDetaliuPage.jsx](https://github.com/ralucamihai/lockerbox/blob/9f4907e730547741c36bb7f8106d3920af199823/frontend/src/pages/LockerDetaliuPage.jsx) | refresh /lockers/1, open /lockers/999 |
| S8-R4 | unknown URL shows the app 404 page | [App.jsx (path="*")](https://github.com/ralucamihai/lockerbox/blob/9f4907e730547741c36bb7f8106d3920af199823/frontend/src/App.jsx), [NotFoundPage.jsx](https://github.com/ralucamihai/lockerbox/blob/9f4907e730547741c36bb7f8106d3920af199823/frontend/src/pages/NotFoundPage.jsx) | open /ceva |
| S8-R5 | each component has its .module.css; index.css only shared styles | [src/components](https://github.com/ralucamihai/lockerbox/tree/9f4907e730547741c36bb7f8106d3920af199823/frontend/src/components), [src/pages](https://github.com/ralucamihai/lockerbox/tree/9f4907e730547741c36bb7f8106d3920af199823/frontend/src/pages), [index.css](https://github.com/ralucamihai/lockerbox/blob/9f4907e730547741c36bb7f8106d3920af199823/frontend/src/index.css) | read |
| S8-R6 | data-testid attributes from tables 7.3 and 8.2; detail route /<resource>/:id | [Layout.jsx](https://github.com/ralucamihai/lockerbox/blob/9f4907e730547741c36bb7f8106d3920af199823/frontend/src/components/Layout.jsx), [LockerCard.jsx](https://github.com/ralucamihai/lockerbox/blob/9f4907e730547741c36bb7f8106d3920af199823/frontend/src/components/LockerCard.jsx), [LockerDetaliuPage.jsx](https://github.com/ralucamihai/lockerbox/blob/9f4907e730547741c36bb7f8106d3920af199823/frontend/src/pages/LockerDetaliuPage.jsx), [NotFoundPage.jsx](https://github.com/ralucamihai/lockerbox/blob/9f4907e730547741c36bb7f8106d3920af199823/frontend/src/pages/NotFoundPage.jsx) | querySelector in the console |
| S8-R7 | README Stage 8 section + AI log | [README.md](https://github.com/ralucamihai/lockerbox/blob/9f4907e730547741c36bb7f8106d3920af199823/README.md), [ai-log/etapa-08.md](https://github.com/ralucamihai/lockerbox/blob/9f4907e730547741c36bb7f8106d3920af199823/ai-log/etapa-08.md) | read |
| S8-R8 | commit "Stage 8" pushed | [commit 9f4907e](https://github.com/ralucamihai/lockerbox/commit/9f4907e730547741c36bb7f8106d3920af199823) | commit history |

## Checklist - Stage 9

| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S9-R1 | npm run dev in backend/ starts the API on 3001 | [backend/package.json](https://github.com/ralucamihai/lockerbox/blob/b8f8d99cc163b024844fa8fa9342853731b9c62a/backend/package.json), [server.js](https://github.com/ralucamihai/lockerbox/blob/b8f8d99cc163b024844fa8fa9342853731b9c62a/backend/src/server.js) | run it, open /health |
| S9-R2 | all five routes answer with the right codes | [routes/lockers.js L66-L121](https://github.com/ralucamihai/lockerbox/blob/b8f8d99cc163b024844fa8fa9342853731b9c62a/backend/src/routes/lockers.js#L66-L121) | curl commands from README |
| S9-R3 | invalid data returns 400 with a clear message | [validation.js L20-L91](https://github.com/ralucamihai/lockerbox/blob/b8f8d99cc163b024844fa8fa9342853731b9c62a/backend/src/validation.js#L20-L91) | POST with empty name |
| S9-R4 | React app works with json-server removed | [frontend/package.json](https://github.com/ralucamihai/lockerbox/blob/b8f8d99cc163b024844fa8fa9342853731b9c62a/frontend/package.json), [api.js L14-L17](https://github.com/ralucamihai/lockerbox/blob/b8f8d99cc163b024844fa8fa9342853731b9c62a/frontend/src/api.js#L14-L17) | stop everything but backend |
| S9-R5 | no CORS errors in the browser console | [app.js L9-L11 (cors)](https://github.com/ralucamihai/lockerbox/blob/b8f8d99cc163b024844fa8fa9342853731b9c62a/backend/src/app.js#L9-L11) | open console |
| S9-R6 | README Stage 9 section + AI log | [README.md](https://github.com/ralucamihai/lockerbox/blob/b8f8d99cc163b024844fa8fa9342853731b9c62a/README.md), [ai-log/etapa-09.md](https://github.com/ralucamihai/lockerbox/blob/b8f8d99cc163b024844fa8fa9342853731b9c62a/ai-log/etapa-09.md) | read |
| S9-R7 | commit "Stage 9" pushed | [Commit Link](https://github.com/ralucamihai/lockerbox/commit/b8f8d99cc163b024844fa8fa9342853731b9c62a) | commit history |
