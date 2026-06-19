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

**App-wide providers live in `src/main.tsx`:** `BrowserRouter` (router), `LocalizationProvider` with `AdapterDayjs` (MUI date pickers), and `<Toaster position="top-right" />` (react-hot-toast host). Add new app-wide providers here, not in `App.tsx`.

**Routing.** The app uses **React Router v7** (`react-router-dom`). `<BrowserRouter basename="/learn-app/">` wraps `<App />` in `src/main.tsx` — the `basename` must stay aligned with the Vite `base` config (`/learn-app/`) for GitHub Pages; change both together if that path ever moves. All routes are declared in `src/App.tsx` inside a single `<Routes>` block — add new pages there. `/` redirects to `/home` via `<Navigate>`. **Work in progress:** `/training`, `/change-password`, and `/registration-verification` currently render inline placeholder `<div>`s, and the `*` catch-all (NotFound) is commented out — these are intentional scaffolding for upcoming work, don't "clean them up" without asking. For navigation, use `<Link>` / `<NavLink>` from `react-router-dom` for in-app routes (see `Header.tsx`) and `useNavigate()` for programmatic navigation from event handlers (see `Home.tsx`). The `Header` nav anchors `Blog` / `Pricing` / `About Us` are still placeholder `<a href="#">` — leave them until the matching pages exist.

**No global state.** No Context API, Redux, or Zustand. Auth state (`isLoggedIn`, `user`) lives as `useState` in `App.tsx` and flows through props to `Header`. Don't add a state library without being asked.

**Folder layout under `src/`:**
- `pages/` — page-level components (`Home/`, `Login/`, `Registration/`, `JoinUs/`, `StudentAccount/`), each in its own folder with co-located CSS module and any page-specific subcomponents
- `components/common/` — reusable UI primitives (`Button/`, `Input/` with variants, `Box/`, `SuccessToast/`, `ConfirmModal/`)
- `layout/` — `Header/` (with `MobileMenu`, `DesktopMenu`), `Footer/`, and shared chrome like `LanguageMenu`
- `assets/` — images and the `Logo.tsx` component
- `types/` — shared TypeScript types. `Role = 'student' | 'trainer'` lives here; reuse it across the registration flow rather than redefining the union

## Styling

CSS Modules (`*.module.css`) co-located with their component. Theme tokens are CSS custom properties defined in `src/index.css` (e.g. `--color-primary`, `--font-body`, `--button-radius`) — consume them in modules instead of hardcoding colors/sizes. No Tailwind, no styled-components.

## TypeScript gotchas

`tsconfig.app.json` enables `strict`, `noUnusedLocals`, and `noUnusedParameters`. Unused variables and parameters fail the build, not just lint. Prefix intentional unused params with `_` (e.g. `_event`).
