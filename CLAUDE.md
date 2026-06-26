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

**App-wide providers live in `src/main.tsx`** in this exact order — keep it:
`StrictMode → BrowserRouter → LocalizationProvider (MUI date pickers) → Provider (Redux) → App + Toaster (react-hot-toast)`.

Add new app-wide providers here, not in `App.tsx`.

**Backend.** The app talks to a separate **Java + Spring** backend on `http://localhost:8080/api/v1`. The base URL is currently **hardcoded** in `src/services/index.ts` (no `.env` plumbing yet) — if it ever moves, change it there. Without the backend running, login, registration, and every data-fetching screen will fail.

### State management (Redux Toolkit)

- Store at `src/store/index.ts` composes two slices: `user` and `trainees`.
- Slices live in `src/store/slices/`, thunks in `src/store/thunks/`, selectors in `src/store/selectors.ts`. Add new ones in the same place.
- Components use raw `useDispatch<AppDispatch>()` and `useSelector(<selector>)` — there are no `useAppDispatch` / `useAppSelector` typed wrappers yet. If you add them, put them in `src/store/`.
- `user` slice owns auth + profile (`isAuth`, `username`, `role`, `token`, `profile`, `loading`, `error`). `trainees` slice caches the global trainee list with a `lastFetched` timestamp (used by `AddTraining` as a ~5-min TTL).

### Services / HTTP

- All services use the native Fetch API. There is no axios and no shared HTTP wrapper — each call reads the bearer token directly from `localStorage.getItem("token")` and constructs its own headers. If you add a wrapper, do it consistently across all four files at once.
- Files under `src/services/`: `userService.ts` (auth + register + change password), `trainerService.ts`, `traineeService.ts`, `trainingService.ts`. The endpoint surface is documented in `README.md` — keep it in sync when adding endpoints.

### Routing

The app uses **React Router v7** (`react-router-dom`). `<BrowserRouter basename="/learn-app/">` wraps `<App />` in `src/main.tsx` — the `basename` must stay aligned with the Vite `base` config (`/learn-app/`) for GitHub Pages; change both together if that path ever moves. All routes are declared in `src/App.tsx` inside a single `<Routes>` block — add new pages there. `/` redirects to `/home` via `<Navigate>`. Current route table:

| Route | Component | Guard |
| --- | --- | --- |
| `/home`, `/login`, `/join-us`, `/registration` | `Home`, `Login`, `JoinUs`, `Registration` | — |
| `/my-account` | `StudentAccount` | `PrivateRoute` |
| `/trainings` | `Trainings` | `PrivateRoute` |
| `/change-password` | `ChangePassword` | `PrivateRoute` |
| `/trainings/add` | `AddTraining` | `PrivateRoute` → `TrainerRoute` |
| `*` | `NotFound` | — |

**Route guards** (`src/routes/`):
- `PrivateRoute` reads `getIsAuthSelector` and redirects unauthenticated users to `/login`.
- `TrainerRoute` is nested inside `PrivateRoute`; it redirects authenticated non-trainers to `/trainings` and surfaces a `react-hot-toast` error.

**Token rehydration on mount.** `App.tsx` runs a `useEffect` that reads `localStorage.token`, decodes it via `src/helpers/decodeToken.ts`, dispatches `setUserData`, and fires `getUserProfileThunk`. Removing or reordering this breaks session restore on page refresh — `isAuth` will start false and `PrivateRoute` will bounce the user to `/login` even when their token is still valid.

For navigation, use `<Link>` / `<NavLink>` from `react-router-dom` for in-app routes (see `Header.tsx`) and `useNavigate()` for programmatic navigation from event handlers (see `StudentAccount.tsx`, `ChangePassword.tsx`). The `Header` nav anchors `Blog` / `Pricing` / `About Us` are still placeholder `<a href="#">` — leave them until the matching pages exist.

**Folder layout under `src/`:**
- `pages/` — page-level components, each in its own folder with co-located CSS module and any page-specific subcomponents:
  - `Home/`, `Login/`, `Registration/` (+ `RegistrationSuccess`), `JoinUs/` (+ `JoinUsBox`), `StudentAccount/` (+ `Profile`, `EditProfile`, `Trainers`, `Trainings`), `Trainings/` (+ `SearchTrainings`, `PassedTrainings`), `AddTraining/`, `ChangePassword/` (+ `ChangePasswordSuccess`), `NotFound/`
- `components/common/` — reusable UI primitives: `Button/`, `Input/` (with variants), `Box/`, `SuccessToast/`, `ConfirmModal/`, `Breadcrumbs/`
- `layout/` — `Header/` (with `MobileMenu`, `DesktopMenu`), `Footer/`, and shared chrome like `LanguageMenu`
- `store/` — `index.ts` (configured store), `slices/`, `thunks/`, `selectors.ts`
- `services/` — `index.ts` (BASE_URL), `userService.ts`, `trainerService.ts`, `traineeService.ts`, `trainingService.ts`
- `routes/` — `PrivateRoute.tsx`, `TrainerRoute.tsx`
- `helpers/` — `decodeToken.ts`
- `assets/` — images and the `Logo.tsx` component
- `types/` — shared TypeScript types:
  - `types/index.ts` — `Role`, `TrainerTraining`, `TraineeTraining`, `Training` (union), `ApiError`
  - `types/user.ts` — `Trainer`, `Trainee`, `TrainerSummary`, `TraineeSummary`, `UpdateTrainerPayload`, `UpdateTraineePayload`

Reuse these types instead of redefining shapes locally.

## Styling

CSS Modules (`*.module.css`) co-located with their component. Theme tokens are CSS custom properties defined in `src/index.css` (e.g. `--color-primary`, `--font-body`, `--button-radius`) — consume them in modules instead of hardcoding colors/sizes. No Tailwind, no styled-components.

## TypeScript gotchas

`tsconfig.app.json` enables `strict`, `noUnusedLocals`, and `noUnusedParameters`. Unused variables and parameters fail the build, not just lint. Prefix intentional unused params with `_` (e.g. `_event`).
