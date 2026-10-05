# LockerBox
A web app for managing storage lockers: which ones are free, which are rented, and what size they are.
Built for students and staff who need to keep track of the lockers in a building.

## Data model
| Field   | Type         | Notes                                |
| ------- | ------------ | ------------------------------------ |
| name    | text         | required, max 100 chars              |
| rented  | boolean      | toggled from the list, default false |
| size    | fixed values | small, medium, large                 |
| zone    | relation     | Campus, Station, Mall                |
| user    | relation     | the owner of the item (from week 11) |

Sample data used across all stages:
1. Locker A-101, free, large
2. Locker B-204, rented, medium
3. Locker C-007, free, small

## How to run
Open `index.html` in a browser. No build step, no server.

## AI usage
| Tool   | Used for                                                        |
| ------ | --------------------------------------------------------------- |
| Claude | HTML/CSS structure and explanations, JavaScript functions, README and AI logs |

Details per stage: see the ai-log/ folder.

## Status
- [x] Stage 1: static mockup
- [ ] Stage 2: data logic in JavaScript
