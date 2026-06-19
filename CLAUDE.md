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

**Routing.** The app uses **React Router v7** (`react-router-dom`). `<BrowserRouter basename="/learn-app/">` wraps `<App />` in `src/main.tsx` — the `basename` must stay aligned with the Vite `base` config (`/learn-app/`) for GitHub Pages; change both together if that path ever moves. All routes are declared in `src/App.tsx` inside a single `<Routes>` block — add new pages there. `/` redirects to `/home` via `<Navigate>`. Current route table:

| Route | Component |
| --- | --- |
| `/home` | `Home` |
| `/login` | `Login` |
| `/join-us` | `JoinUs` |
| `/registration` | `Registration` |
| `/my-account` | `StudentAccount` |
| `/trainings` | `Trainings` |
| `/change-password` | `ChangePassword` |
| `*` | `NotFound` |

**Work in progress:** `/registration-verification` has no page yet — leave the commented-out route scaffold in `App.tsx` until it's built. For navigation, use `<Link>` / `<NavLink>` from `react-router-dom` for in-app routes (see `Header.tsx`) and `useNavigate()` for programmatic navigation from event handlers (see `StudentAccount.tsx`, `ChangePassword.tsx`). The `Header` nav anchors `Blog` / `Pricing` / `About Us` are still placeholder `<a href="#">` — leave them until the matching pages exist.

**No global state.** No Context API, Redux, or Zustand. Auth state (`isLoggedIn`, `user`) lives as `useState` in `App.tsx` and flows through props to `Header`. Don't add a state library without being asked.

**Folder layout under `src/`:**
- `pages/` — page-level components, each in its own folder with co-located CSS module and any page-specific subcomponents:
  - `Home/`, `Login/`, `Registration/` (+ `RegistrationSuccess`), `JoinUs/` (+ `JoinUsBox`), `StudentAccount/` (+ `Profile`, `EditProfile`, `Trainers`, `Trainings`), `Trainings/` (+ `SearchTrainings`, `PassedTrainings`), `ChangePassword/` (+ `ChangePasswordSuccess`), `NotFound/`
- `components/common/` — reusable UI primitives: `Button/`, `Input/` (with variants), `Box/`, `SuccessToast/`, `ConfirmModal/`, `Breadcrumbs/`
- `layout/` — `Header/` (with `MobileMenu`, `DesktopMenu`), `Footer/`, and shared chrome like `LanguageMenu`
- `assets/` — images and the `Logo.tsx` component
- `types/` — shared TypeScript types. `Role = 'student' | 'trainer'` and `Training = { date, name, type, trainerName, duration }` live here; reuse them rather than redefining locally

## Styling

CSS Modules (`*.module.css`) co-located with their component. Theme tokens are CSS custom properties defined in `src/index.css` (e.g. `--color-primary`, `--font-body`, `--button-radius`) — consume them in modules instead of hardcoding colors/sizes. No Tailwind, no styled-components.

## TypeScript gotchas

`tsconfig.app.json` enables `strict`, `noUnusedLocals`, and `noUnusedParameters`. Unused variables and parameters fail the build, not just lint. Prefix intentional unused params with `_` (e.g. `_event`).
