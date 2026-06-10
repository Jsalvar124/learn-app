# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager: **npm** (lockfile is `package-lock.json`).

- `npm run dev` — start the Vite dev server with HMR
- `npm run build` — type-check (`tsc -b`) then produce a production build
- `npm run lint` — run ESLint over the project
- `npm run preview` — serve the built `dist/` locally

There is no test runner configured.

## Architecture

**Stack:** React 19 + TypeScript (strict) + Vite 8, with the React Compiler enabled via `@vitejs/plugin-react` (Oxc). Avoid manual `useMemo`/`useCallback` for values the compiler will already memoize.

**No router.** `src/App.tsx` renders one page at a time by hand — other pages are commented out rather than mounted behind routes. When switching which page is "active," edit `App.tsx` directly; do not introduce `react-router-dom` unless the user asks.

**No global state.** No Context API, Redux, or Zustand. State flows through props. Don't add a state library without being asked.

**Folder layout under `src/`:**
- `pages/` — page-level components (`Login/`, `Registration/`, `JoinUs/`), each in its own folder with co-located CSS module and subcomponents
- `components/common/` — reusable UI primitives (`Button/`, `Input/` with variants)
- `layout/` — `Header/`, `Footer/`, and shared chrome like `LanguageMenu`
- `assets/` — images and the `Logo.tsx` component
- `types/` — shared TypeScript types. `Role = 'student' | 'trainer'` lives here; reuse it across the registration flow rather than redefining the union

## Styling

CSS Modules (`*.module.css`) co-located with their component. Theme tokens are CSS custom properties defined in `src/index.css` (e.g. `--color-primary`, `--font-body`, `--button-radius`) — consume them in modules instead of hardcoding colors/sizes. No Tailwind, no styled-components.

## TypeScript gotchas

`tsconfig.app.json` enables `strict`, `noUnusedLocals`, and `noUnusedParameters`. Unused variables and parameters fail the build, not just lint. Prefix intentional unused params with `_` (e.g. `_event`).
