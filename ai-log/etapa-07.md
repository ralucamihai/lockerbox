# Stage 7: AI log

## Tools
- Gemini

## Conversations
- Conversație privată Gemini (Stage 7 controlled form, client-side validation, full CRUD HTTP request helpers, automated testing setup with tw.json and data-testid attributes)

## Key requests
### 1. HTTP Helpers & API Integration
- Asked: How to expand `api.js` with a unified `request()` function supporting GET, POST, PATCH, and DELETE operations.
- Got: Added `createLocker`, `updateLocker`, and `deleteLocker` functions handling JSON headers and 204 No Content status.

### 2. Controlled Form & Client Validation
- Asked: How to build a controlled form with state fields, custom validation, and error display near the input.
- Got: Created `LockerForm.jsx` managing input values, preventing default submission, validating required non-empty titles, and disabling submission during pending requests.

### 3. Server-first State & Automated Tests
- Asked: How to update App state with server response data and configure test metadata.
- Got: Updated `App.jsx` handlers to await API responses before mutating React state, created root `tw.json`, and added `data-testid` attributes to JSX components for automated evaluation.

## What I learned / what did not work
Learned why `e.preventDefault()` is mandatory in React forms, how server-generated IDs prevent primary key collisions, why fields should only be cleared after a successful `await`, and how data attributes facilitate automated headless browser testing.
