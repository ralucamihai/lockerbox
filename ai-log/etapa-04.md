# Stage 4: AI log

## Tools
- Gemini

## Conversations
- Conversație privată Gemini (Stage 4 React components, props passing, list rendering with map and key)

## Key requests
### 1. Component Architecture
- Asked: How to split the LockerBox list interface into standalone modular React components.
- Got: Created `LockerCard.jsx` and `LockerList.jsx` in `frontend/src/components/`, passing data down via props.
- Changed or rejected: Custom CSS classes and highway theme tags were preserved to match the Stage 1 mockup design.

### 2. List Rendering & Conditional Displays
- Asked: How to render list items safely using `.map()` with unique keys and display empty list messages conditionally.
- Got: Applied `key={locker.id}` on the rendered `LockerCard` and implemented early return logic for empty arrays.
- Troubleshooting: Resolved Vite import path error `Failed to resolve import "./components/LockerList.jsx"` by ensuring correct folder location in `src/components/`.

## What I learned / what did not work
Learned why React requires a unique `key` prop for array items, how destructured props pass data immutably between parent and child components, and how to verify clean browser console output without React key warnings.