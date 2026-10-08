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

## Pages

`index.html` contains four tabs styled as highway exits:

- **Exit 1**: the locker list
- **Exit 2**: the add-locker form
- **Exit 3**: a dashboard
- **Exit 4**: the rules page

## How to run

Open `index.html` in a browser. No build step, no server.
Alternatively, run `npx live-server` in the terminal.

## Stage 2: data logic

Plain JavaScript, no DOM. `lockere.js` holds the array and the functions that read and change it. Results are printed in the browser console (F12).

## AI usage

| Tool   | Used for                                                                                             |
| ------ | ---------------------------------------------------------------------------------------------------- |
| Claude | HTML/CSS structure and explanations, README and AI log (stage 1)                                     |
| Gemini | Permalinks guidance (stage 1), data logic implementation, immutable array functions (stage 2)        |

Details per stage: see the `ai-log/` folder.

## Status

- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [ ] Stage 3: Vite and React project

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

| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S2-R1 | JS file linked, logs on page load | [index.html](https://github.com/ralucamihai/lockerbox/blob/<commit_hash>/index.html#L225) | open page, F12 |
| S2-R2 | 3+ items with id, name, state, tag | [lockere.js](https://github.com/ralucamihai/lockerbox/blob/<commit_hash>/lockere.js#L10-L14) | read |
| S2-R3 | list, count, search, add, toggle, delete | [lockere.js](https://github.com/ralucamihai/lockerbox/blob/<commit_hash>/lockere.js#L16-L70) | console output |
| S2-R4 | add rejects empty name and invalid tag | [lockere.js](https://github.com/ralucamihai/lockerbox/blob/<commit_hash>/lockere.js#L37-L49) | last 2 console lines |
| S2-R5 | original array unchanged after add | [lockere.js](https://github.com/ralucamihai/lockerbox/blob/<commit_hash>/lockere.js#L81) | console line |
| S2-R6 | README Stage 2 section + AI log | [README.md](https://github.com/ralucamihai/lockerbox/blob/<commit_hash>/README.md), [ai-log/etapa-02.md](https://github.com/ralucamihai/lockerbox/blob/<commit_hash>/ai-log/etapa-02.md) | read |
| S2-R7 | commit "Stage 2" pushed | [Commit Link](https://github.com/ralucamihai/lockerbox/commit/<commit_hash>) | commit history |