
# Stage 5: AI log

## Tools
- Gemini

## Conversations
- Conversație privată Gemini (Stage 5 local state with useState, immutable handlers, controlled checkbox, Bucharest parcel domain adaptation & compartment availability badges, daylight/night theme toggle) https://share.gemini.google/UiJHmXKNoo0T

## Key requests
### 1. State Management & Parcel Domaingit 
- Asked: How to manage parcel locker data using `useState` in `App.jsx` and pass immutable handlers (`handleToggle` and `handleDelete`) to components.
- Got: Updated state array to reflect Bucharest parcel locker locations (`Otopeni`, `Militari`, `Unirii`), added `slots` tracking for S, M, L compartments, and rendered availability badges per card.

### 2. UI Layout & Background Fixes
- Asked: How to eliminate side white bands, improve text wrapping, and create authentic Day/Night road backgrounds.
- Got: Refactored CSS with CSS variables (`--sky-gradient`, `--road-asphalt`), styled horizontal flexbox cards, and added dynamic theme switching via `data-theme="light"` and `data-theme="dark"`.

### 3. Derived Data & Accessibility
- Asked: How to calculate global free compartments and active lockers automatically without keeping duplicate state.
- Got: Computed derived totals (`totalSlotsSmall`, `totalSlotsMedium`, `totalSlotsLarge`) directly in `App.jsx` and added accessible `aria-label` and `title` attributes.

## What I learned / what did not work
Learned how to derive aggregate statistics from nested state properties using `.reduce()`, how theme toggling directly manipulates `document.documentElement.dataset.theme`, and how to maintain high-octane visual styling while strictly focusing on parcel locker usability.