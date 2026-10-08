# Stage 1: AI log

## Tools
- Claude (claude.ai), Gemini

## Conversations
- <LINK_SHARE> (LockerBox mockup: HTML structure, CSS variables, Grid/Flexbox, dark theme)

## Key requests
### 1. Page structure and CSS
- Asked: step-by-step help to build the Stage 1 mockup for a locker management app, following the course guide.
- Got: semantic HTML (header, main, section, footer), a stylesheet where every color is a CSS variable, a 2-column Grid that becomes 1 column under 700px, visible focus and a dark theme that only redefines variables.
- Changed or rejected: I replaced my older stylesheet (different class names, hard-coded colors) with the new one, and kept my blue accent color. I adapted the sample data to lockers (A-101, B-204, C-007).

### 2. README and Git workflow
- Asked: how to write the README and publish the project on GitHub.
- Got: a README template filled for LockerBox and the git commands (init, add, commit, remote, push).
- Changed or rejected: I checked each command in the terminal and confirmed the README appears on GitHub.

## What I learned / what did not work
Semantic elements make the page structure clearer than plain divs. Defining all colors as CSS variables makes the dark theme simple, because only the variable values change. The @media rule must come after the .container rule, otherwise it has no effect.
