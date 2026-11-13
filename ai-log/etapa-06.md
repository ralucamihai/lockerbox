# Stage 6: AI log

## Tools
- Gemini

## Conversations
- Conversație privată Gemini (Stage 6 mock API setup with json-server, useEffect data fetching, error & loading handling, cleanup effect)

## Key requests
### 1. Mock API Setup
- Asked: How to configure json-server@0.17.4 with custom resource `lockers` and start script on port 3001.
- Got: Created `frontend/db.json` with 5 parcel locker items and added `"api": "json-server --watch db.json --port 3001"` script in `package.json`.

### 2. API Helper & Environment Variables
- Asked: How to isolate `fetch` in a single helper file using `import.meta.env`.
- Got: Created `frontend/src/api.js` exporting `fetchLockers()` and added `.env.example` defining `VITE_API_URL`.

### 3. useEffect Fetching & Loading/Error States
- Asked: How to replace static initial state in `App.jsx` with dynamic API fetching handling loading and error states.
- Got: Updated `App.jsx` with `useEffect`, cleanup flag `ignore`, try/catch/finally block, and conditional rendering for loading and error UI.

## What I learned / what did not work
Learned how `json-server@0.17.4` exposes REST endpoints from `db.json`, why `res.ok` must be checked manually when using `fetch`, how the `ignore` boolean prevents memory leaks and state updates on unmounted components, and how React strict mode double-invokes effects during development.
