# Stage 8: AI log

## Tools
- Gemini

## Conversations
- Conversație privată Gemini (Stage 8 React Router, shared Layout with Outlet, detail page with useParams, 404 page, CSS Modules)

## Key requests
### 1. Routing and shared layout
- Asked: How to split the LockerBox app into pages with React Router (list, detail page at `/lockers/:id`, about page, 404 page) and a layout written only once.
- Got: `BrowserRouter` in `main.jsx`, a route map in `App.jsx`, a `Layout` component with `NavLink` links and `<Outlet />`, and the old `App.jsx` logic moved into `LockersPage.jsx`.
- Changed or rejected: Kept my dashboard and rules tabs as real routes (`/dashboard`, `/regulament`) and moved the header counters into the list panel, because the header is now shared by all pages.

### 2. Detail page
- Asked: How to read the id from the URL and request exactly that locker, including the case when it does not exist.
- Got: `fetchLocker(id)` in `api.js` and `LockerDetaliuPage.jsx` with `useParams()`, an effect depending on `[id]`, and loading / error states with a link back to the list.
- Changed or rejected: Added the fields that do not fit in the card (zone, size label, compartments per size).

### 3. CSS Modules
- Asked: How to move the styles next to their components without breaking the day/night theme.
- Got: One `*.module.css` file per component, class names written as `styles.name`; `index.css` keeps only the color variables, the animated road background and the shared classes.
- Changed or rejected: Fixed a missing `react-router-dom` dependency (it had been installed in the repository root instead of `frontend/`).

## What I learned / what did not work
Learned how `Link` and `NavLink` change the address without reloading the page, why `useParams` returns text, how `<Outlet />` places each page inside the shared layout, and how CSS Modules give each class a unique name. Learned that a dependency must be installed in the same folder as the `package.json` that lists it, otherwise a clean clone does not build.
