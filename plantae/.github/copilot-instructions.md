## Purpose
Short, practical guidance for AI agents editing Plantae (Create React App SPA).

## Quick start (commands)
- Install: `npm install`
- Dev server: `npm start` (CRA, opens on localhost:3000)
- Run tests: `npm test`
- Production build: `npm run build`

## Big picture
- This is a small Create React App single-page app. The main UI state lives in `src/App.jsx`.
- Plant data is a static module: `src/data/plants.js` — new plants are added by editing this file.
- Presentation is componentized under `src/components/`: `PlantCard.jsx`, `PlantModal.jsx`, `CareFact.jsx`.
- Data flow: `App.jsx` loads `plantData` → filters by `searchQuery` → renders `PlantCard` list. Clicking a card calls `onCardClick` (prop) to set `selectedPlant` in `App`, which is passed into `PlantModal`.

## Project-specific conventions
- Prefer small functional components and lift state to `App.jsx` for cross-component interactions (see `selectedPlant` handling).
- Component props: use explicit prop names like `plant`, `onCardClick`, `onClose` — follow existing shapes.
- CSS class names are used for layout/animation in `src/styles/App.css`; avoid renaming classes unless updating styles together.
- `plant` object keys expected in `src/data/plants.js`: `id`, `name`, `species`, `imageUrl`, `secretfact`, `light`, `water`.

## Editing patterns & examples
- To add a plant, append an object to `src/data/plants.js` with a unique numeric `id` and the keys above.
- To add UI for a new field, update `PlantModal.jsx` and `PlantCard.jsx` and keep class names consistent so styles apply.
- Modal behavior: clicking backdrop triggers `onClose`; inner container stops propagation — preserve this pattern when modifying modal logic.

## Tests, build, and CI considerations
- Uses default CRA test runner. Keep tests fast and component-scoped. Use `npm test` during development.
- Do not `eject` unless absolutely necessary (see `package.json` script `eject`).

## Integration points & external deps
- No backend/API in this repo — all content is client-side and static (images are external URLs in `plants.js`).
- Key dependency: `react-scripts@5.0.1`. Changes to build tooling must consider CRA constraints.

## Merge guidance
- If `.github/copilot-instructions.md` already exists, merge rather than overwrite: preserve any repository-specific notes, then add or update sections above.

## Where to look first
- App entry and app-level state: [src/App.jsx](src/App.jsx)
- Components: [src/components/PlantCard.jsx](src/components/PlantCard.jsx), [src/components/PlantModal.jsx](src/components/PlantModal.jsx), [src/components/CareFact.jsx](src/components/CareFact.jsx)
- Source data: [src/data/plants.js](src/data/plants.js)
- Styles: [src/styles/App.css](src/styles/App.css)

If anything above is unclear or you want more examples (e.g., a sample plant entry or a suggested test file), tell me which part to expand.
