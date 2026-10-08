# Stage 2: AI log

## Tools
- Gemini

## Conversations
- Conversație privată Gemini (Stage 2 data logic implementation, immutability, array methods)

## Key requests
### 1. Pure JavaScript data logic
- Asked: Implement the basic data functions for LockerBox (listing, filtering active items, search, add with validation, toggle status, delete) without modifying the DOM.
- Got: Functions written with Array.prototype methods (map, filter, reduce) and the spread operator to ensure immutability.
- Changed or rejected: Kept the exact field names (name, rented, size) defined in README.md.

## What I learned / what did not work
Learned that immutable functions must return a new array instance (e.g. `[...list, newItem]`) instead of mutating with `push()`. Also understood how `reduce` prevents duplicate IDs when items are removed.