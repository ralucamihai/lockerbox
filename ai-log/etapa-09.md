# Stage 9: AI log

## Tools
- Gemini

## Conversations
- https://gemini.google.com/app/6010f7ee60bf6e33 (Stage 9: Express backend, server-side validation, CORS, API tests, removing json-server, form validation fix after the Stage 7 evaluation)

## Key requests
### 1. Express backend
- Asked: Replace json-server with my own API in `backend/`: REST routes for the five operations, validation on the server, correct HTTP codes and error handling, using the Stage 9 guide.
- Got: `app.js` (CORS, `express.json()`, `/health`, 404 route, central error handler), `server.js`, `routes/lockers.js` (GET list, GET one, POST, PATCH, DELETE) and `validation.js`, with the five lockers from the old `db.json` as starting data.
- Changed or rejected: Adapted the guide's TaskFlow example to my theme (`/lockers`, `name`, `rented`, `size`, `zone`, `slots`). `slots` is optional and validated, because the cards and the detail page display it. `parseId` accepts only plain positive integers.

### 2. Removing json-server
- Asked: Make the frontend work only with the new server.
- Got: `api.js` now throws the message from `{ error: "..." }`, `db.json`, the `api` script and the `json-server` package were deleted, `package-lock.json` was regenerated, and the error hint on the list page points to `backend/`.

### 3. Fix for the partial grade at S7-R2
- Asked: The evaluation marked the empty-field validation as incomplete (0.07 of 0.13 points).
- Got: The form only checked the name. `LockerForm.jsx` now checks name, size and zone before any request; zone is required and no longer replaced silently with a default.
- Changed or rejected: Kept `data-testid` attributes and `tw.json` unchanged.

### 4. Tests
- Asked: Check the API independently of the interface.
- Got: `backend/test/api.test.js` (run with `npm test`) for codes, validation, field whitelist and CORS headers, plus the `curl` commands in the README.

## What I learned / what did not work
Learned why the browser blocks requests between ports (CORS) and that the fix is always on the server, why validation must exist on the server even when the form already validates, how a field whitelist stops a client from setting `id` or unknown fields, and why `app.js` is separate from `server.js`. Learned the order that matters in Express: middleware, routes, the 404 route and last the error handler with four parameters. Learned that a validation check is incomplete if it covers only one field of the form.
