# LockerBox

A web app for managing storage lockers along an American highway: which ones are free, which are rented, and what size they are.
Built for students and staff who need to keep track of the lockers in a building.

## Data model

| Field  | Type         | Notes                                |
| ------ | ------------ | ------------------------------------ |
| name   | text         | required, max 100 chars              |
| rented | boolean      | toggled from the list, default false |
| size   | fixed values | small, medium, large                 |
| zone   | relation     | Truck Stop, Motel, Pier              |
| user   | relation     | the owner of the item (from week 11) |

Sample data used across all stages:

1. Locker A-101, free, large
2. Locker B-204, rented, medium
3. Locker C-007, free, small

## Project structure

```
lockerbox/
├── mockup/      Stages 1-2: static HTML/CSS mockup + plain JavaScript data logic
│   ├── index.html
│   ├── style.css
│   └── lockere.js
├── frontend/    Stages 3-4: Vite + React app
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── main.jsx
│       └── components/
│           ├── LockerList.jsx
│           └── LockerCard.jsx
└── ai-log/      AI usage log, one file per stage
```

## Pages

The mockup (`mockup/index.html`) contains four tabs styled as highway exits:

- **Exit 1**: the locker list
- **Exit 2**: the add-locker form
- **Exit 3**: a dashboard
- **Exit 4**: the rules page

The React app (`frontend/`) currently renders the locker list (Exit 1) with the same highway theme: a header with a live free-lockers counter, the list of locker cards, and a footer.

## How to run

**Mockup (stages 1-2):** open `mockup/index.html` in a browser. No build step, no server.
Alternatively, run `npx live-server mockup` in the terminal.

**React app (stages 3-4):**

```bash
cd frontend
npm install
npm run dev
```

Then open the local address printed by Vite (usually http://localhost:5173).
Other scripts: `npm run build` (production build), `npm run lint`.

## Stage 2: data logic

Plain JavaScript, no DOM. `mockup/lockere.js` holds the array and the functions that read and change it. Results are printed in the browser console (F12). All functions are immutable: they return a new array instead of changing the one they receive.

## Stage 3: Vite and React project

The project lives in `frontend/`, created with Vite and React 19. `index.html` keeps the animated highway background, and React mounts the app into `#root` from `src/main.jsx`. The mockup stylesheet was carried over into `src/App.css`, so the React version keeps the Stage 1 look.

## Stage 4: React components

The list interface is split into two components in `frontend/src/components/`:

- `LockerList.jsx` receives the `lockers` array as a prop, renders one `LockerCard` per item with `.map()` and `key={locker.id}`, and shows a message when the array is empty.
- `LockerCard.jsx` receives a single `locker` as a prop and renders its name, size badge, zone, and status. A rented locker gets the `done` style and a disabled button.

`App.jsx` holds the sample data for now, computes the free-lockers count for the header, and passes the array down to `LockerList`. Adding, renting, and deleting from the UI (the Stage 2 logic) is not connected yet.

## AI usage

| Tool   | Used for                                                                                             |
| ------ | ---------------------------------------------------------------------------------------------------- |
| Claude | HTML/CSS structure and explanations, README and AI log (stage 1)                                     |
| Gemini | Permalinks guidance (stage 1), data logic implementation, immutable array functions (stage 2), React components, props and list rendering (stage 4) |

Details per stage: see the `ai-log/` folder.

## Status

- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data
- [ ] Stage 5: local state and events

## Checklist - Stage 1

| ID    | Requirement                                          | Where (permalink)                                                                                                    | How to check                                |
| ----- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| S1-R1 | README: description, fields, sample data, how to run | [README.md][readme]                                                                                                  | read                                        |
| S1-R2 | AI usage section                                     | [README.md][readme]                                                                                                  | read                                        |
| S1-R3 | AI log for stage 1                                   | [ai-log/etapa-01.md][ailog]                                                                                          | read                                        |
| S1-R4 | header, form (text + select), 3 cards with own data  | [header L37-L48][r4-header], [form L147-L177][r4-form], [cards L81-L135][r4-cards]                                   | open the page (form is on the "Exit 2" tab) |
| S1-R5 | finished card looks different                        | [index.html L101-L116][r5-html], [style.css L507-L510 (.done)][r5-css]                                              | look at card Locker B-204 (struck through)  |
| S1-R6 | 2 columns on desktop, 1 under 700px                  | [style.css L706-L726 (@media)][r6-media]                                                                             | resize the window under 768px               |
| S1-R7 | visible focus, readable dark theme                   | [focus L548-L553][r7-focus], [:root L9-L26][r7-root]                                                                 | Tab on the form fields; page is dark-only   |
| S1-R8 | commit "Stage 1" pushed                              | [commit cac12e4][commit]                                                                                             | commit history                              |

<!-- Permalinks (commit cac12e4) -->
[readme]:    https://github.com/ralucamihai/lockerbox/blob/cac12e405578e97aedd5499b438ea59e8a2a1ae5/README.md
[ailog]:     https://github.com/ralucamihai/lockerbox/blob/cac12e405578e97aedd5499b438ea59e8a2a1ae5/ai-log/etapa-01.md
[r4-header]: https://github.com/ralucamihai/lockerbox/blob/cac12e405578e97aedd5499b438ea59e8a2a1ae5/index.html#L37-L48
[r4-form]:   https://github.com/ralucamihai/lockerbox/blob/cac12e405578e97aedd5499b438ea59e8a2a1ae5/index.html#L147-L177
[r4-cards]:  https://github.com/ralucamihai/lockerbox/blob/cac12e405578e97aedd5499b438ea59e8a2a1ae5/index.html#L81-L135
[r5-html]:   https://github.com/ralucamihai/lockerbox/blob/cac12e405578e97aedd5499b438ea59e8a2a1ae5/index.html#L101-L116
[r5-css]:    https://github.com/ralucamihai/lockerbox/blob/cac12e405578e97aedd5499b438ea59e8a2a1ae5/style.css#L507-L510
[r6-media]:  https://github.com/ralucamihai/lockerbox/blob/cac12e405578e97aedd5499b438ea59e8a2a1ae5/style.css#L706-L726
[r7-focus]:  https://github.com/ralucamihai/lockerbox/blob/cac12e405578e97aedd5499b438ea59e8a2a1ae5/style.css#L548-L553
[r7-root]:   https://github.com/ralucamihai/lockerbox/blob/cac12e405578e97aedd5499b438ea59e8a2a1ae5/style.css#L9-L26
[commit]:    https://github.com/ralucamihai/lockerbox/commit/cac12e405578e97aedd5499b438ea59e8a2a1ae5

## Checklist - Stage 2

Permalinks point to the commits where the files were pushed, so they keep working after the move to `mockup/`.

| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S2-R1 | JS file linked, logs on page load | [index.html](https://github.com/ralucamihai/lockerbox/blob/8bb5115879b7ae3ad91434291cf1cf01396825d6/index.html#L225) | open page, F12 |
| S2-R2 | 3+ items with id, name, state, tag | [lockere.js](https://github.com/ralucamihai/lockerbox/blob/2fcfa52513ca62618de6737f01d8e61be9b83d91/lockere.js#L9-L13) | read |
| S2-R3 | list, count, search, add, toggle, delete | [lockere.js](https://github.com/ralucamihai/lockerbox/blob/2fcfa52513ca62618de6737f01d8e61be9b83d91/lockere.js#L15-L74) | console output |
| S2-R4 | add rejects empty name and invalid tag | [lockere.js](https://github.com/ralucamihai/lockerbox/blob/2fcfa52513ca62618de6737f01d8e61be9b83d91/lockere.js#L40-L50) | last 2 console lines |
| S2-R5 | original array unchanged after add | [lockere.js](https://github.com/ralucamihai/lockerbox/blob/2fcfa52513ca62618de6737f01d8e61be9b83d91/lockere.js#L85-L88) | console line |
| S2-R6 | README Stage 2 section + AI log | [README.md](https://github.com/ralucamihai/lockerbox/blob/8bb5115879b7ae3ad91434291cf1cf01396825d6/README.md), [ai-log/etapa-02.md](https://github.com/ralucamihai/lockerbox/blob/8bb5115879b7ae3ad91434291cf1cf01396825d6/ai-log/etapa-02.md) | read |
| S2-R7 | commit "Stage 2" pushed | [Commit Link](https://github.com/ralucamihai/lockerbox/commit/2fcfa52513ca62618de6737f01d8e61be9b83d91) | commit history |

## Checklist - Stage 3

| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S3-R1 | npm run dev starts without errors | [frontend/package.json](https://github.com/ralucamihai/lockerbox/blob/698f439f438210fb2cb142e871a6b74084888448/frontend/package.json) | npm install, npm run dev |
| S3-R2 | app name and counter computed from data | [App.jsx L10](https://github.com/ralucamihai/lockerbox/blob/698f439f438210fb2cb142e871a6b74084888448/frontend/src/App.jsx#L10), [App.jsx L14-L27](https://github.com/ralucamihai/lockerbox/blob/698f439f438210fb2cb142e871a6b74084888448/frontend/src/App.jsx#L14-L27) | edit data, save |
| S3-R3 | data from README, not from the example | [App.jsx L3-L7](https://github.com/ralucamihai/lockerbox/blob/698f439f438210fb2cb142e871a6b74084888448/frontend/src/App.jsx#L3-L7) | compare with README |
| S3-R4 | stage 1 styles reused | [frontend/src/App.css](https://github.com/ralucamihai/lockerbox/blob/698f439f438210fb2cb142e871a6b74084888448/frontend/src/App.css) | look at the page |
| S3-R5 | node_modules ignored, build passes | [frontend/.gitignore L10-L11](https://github.com/ralucamihai/lockerbox/blob/698f439f438210fb2cb142e871a6b74084888448/frontend/.gitignore#L10-L11) | npm run build |
| S3-R6 | README Stage 3 section + AI log | [README.md](https://github.com/ralucamihai/lockerbox/blob/main/README.md), [ai-log/etapa-03.md](https://github.com/ralucamihai/lockerbox/blob/main/ai-log/etapa-03.md) | read |
| S3-R7 | commit "Stage 3" pushed | [Commit Link](https://github.com/ralucamihai/lockerbox/commit/698f439f438210fb2cb142e871a6b74084888448) | commit history |

## Checklist - Stage 4

| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S4-R1 | 2+ components in src/components/ | [frontend/src/components/](https://github.com/ralucamihai/lockerbox/blob/26b418585331e9bbcbe620865c1d5e2186b110af/frontend/src/components) | open folder |
| S4-R2 | card receives data through props | [LockerCard.jsx L7-L24](https://github.com/ralucamihai/lockerbox/blob/26b418585331e9bbcbe620865c1d5e2186b110af/frontend/src/components/LockerCard.jsx#L7-L24) | read |
| S4-R3 | map + key={id}, no console warnings | [LockerList.jsx L13-L17](https://github.com/ralucamihai/lockerbox/blob/26b418585331e9bbcbe620865c1d5e2186b110af/frontend/src/components/LockerList.jsx#L13-L17) | F12, Console |
| S4-R4 | message for empty list | [LockerList.jsx L4-L10](https://github.com/ralucamihai/lockerbox/blob/26b418585331e9bbcbe620865c1d5e2186b110af/frontend/src/components/LockerList.jsx#L4-L10) | set array to [] |
| S4-R5 | state changes the card look | [LockerCard.jsx L11](https://github.com/ralucamihai/lockerbox/blob/26b418585331e9bbcbe620865c1d5e2186b110af/frontend/src/components/LockerCard.jsx#L11), [L27-L29](https://github.com/ralucamihai/lockerbox/blob/26b418585331e9bbcbe620865c1d5e2186b110af/frontend/src/components/LockerCard.jsx#L27-L29) | toggle `rented` on an item |
| S4-R6 | README Stage 4 section + AI log | [README.md](https://github.com/ralucamihai/lockerbox/blob/main/README.md), [ai-log/etapa-04.md](https://github.com/ralucamihai/lockerbox/blob/26b418585331e9bbcbe620865c1d5e2186b110af/ai-log/etapa-04.md) | read |
| S4-R7 | commit "Stage 4" pushed | [Commit Link](https://github.com/ralucamihai/lockerbox/commit/26b418585331e9bbcbe620865c1d5e2186b110af) | commit history |
