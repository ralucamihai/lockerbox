# Stage 3: AI log

## Tools
- Gemini

## Conversations
- Conversație privată Gemini (Stage 3 Vite + React setup, folder reorganization, CSS integration) https://share.gemini.google/UiJHmXKNoo0T

## Key requests
### 1. Project Initialization & Clean Up
- Asked: How to initialize Vite + React in `frontend/` folder, clean demo files, and reorganize old mockups.
- Got: Step-by-step commands for `npm create vite@latest`, moving `index.html` and `style.css` into `mockup/`, clearing demo assets, and linking CSS to `App.css`.

### 2. JSON Data Rendering
- Asked: How to adapt `App.jsx` and `main.jsx` to display initial raw array data as JSON text in the theme layout.
- Got: Configuration for `main.jsx` importing `App.css` and `App.jsx` rendering `<pre>{JSON.stringify(lockers, null, 2)}</pre>` inside the American Highway panel structure.

## What I learned / what did not work
Learned how Vite structures a React project, how `main.jsx` mounts the root component onto `index.html`, and how to embed raw data inside JSX before modularizing into components.