# learn-app

A React learning-platform UI built for the **EPAM Frontend React course (Task 1)**.

🔗 **Live demo:** https://jsalvar124.github.io/learn-app/ — note the deployed build only renders the UI; it cannot reach the backend, which only runs locally on `:8080`.

---

## About the project

`learn-app` is the front-end of a learning platform where **trainers** create training sessions and **trainees** enroll in them.

The frontend now talks to a separate **Java + Spring** backend at `http://localhost:8080/api/v1`. State is managed with **Redux Toolkit** (two slices: `user` for auth + profile, `trainees` for the cached trainee list). Auth is JWT-based — the token is stored in `localStorage`, and a bootstrap effect in `App.tsx` decodes it on every mount so the user stays logged in across refreshes.

### Status of each flow

**Working end-to-end against the backend:** login, registration for both roles (trainer / trainee), token rehydration on refresh, profile view + edit on `/my-account` (writes through `updateUserThunk`), change password (logs the user out on success), the `/trainings` list (which renders either the trainer view or the trainee view based on the role in Redux), and the trainer-only `/trainings/add` form (which populates its trainee dropdown from the cached `trainees` slice).

**UI-only / not wired:** the **delete profile** action on `/my-account` opens its confirmation modal but only logs to the console — no `DELETE /trainees/{username}` call is made from the component. The **Header anchors** `Blog` / `Pricing` / `About Us` are placeholder `<a href="#">`. A `/registration-verification` page is on the roadmap but not built yet.

### Routes

| Route | Page | Access |
| --- | --- | --- |
| `/home` | Home | Public |
| `/login` | Login | Public |
| `/join-us` | Join Us | Public |
| `/registration` | Registration | Public |
| `/my-account` | Student Account | Authenticated |
| `/trainings` | Trainings | Authenticated |
| `/change-password` | Change Password | Authenticated |
| `/trainings/add` | Add Training | Authenticated **+ trainer role** |
| `*` | Not Found | — |
| `/` | — | Redirects to `/home` |

Two route guards live in `src/routes/`:

- **`PrivateRoute`** — redirects unauthenticated users to `/login`.
- **`TrainerRoute`** — nested inside `PrivateRoute`; redirects logged-in non-trainers to `/trainings` and shows a toast.

---

## Getting started

### Prerequisites
- **Node.js** (LTS recommended)
- **npm** (the project uses `package-lock.json`)
- **git**
- The companion **Java + Spring backend** running on `http://localhost:8080`. Without it, login, registration, and any data-fetching screen will fail.

### 1. Clone the repository
```bash
git clone https://github.com/Jsalvar124/learn-app.git
cd learn-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the dev server
```bash
npm run dev
```
Vite will print a local URL (usually http://localhost:5173/learn-app/) — open it in a browser and you should see the app with HMR enabled. The frontend expects the Spring backend at `localhost:8080`; without it, any flow that hits the network will error.

### All available scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR. |
| `npm run build` | Type-check (`tsc -b`) then produce a production build into `dist/`. |
| `npm run lint` | Run ESLint over the project. |
| `npm run preview` | Serve the built `dist/` locally. |
| `npm run predeploy` | Runs automatically before `deploy`; builds the project. |
| `npm run deploy` | Publishes `dist/` to GitHub Pages via `gh-pages`. |

> `vite.config.ts` sets `base: '/learn-app/'` so assets resolve correctly under the GitHub Pages publish path.

---

## Tech stack

### Framework & build
- **React 19** with the **React Compiler** enabled (`@vitejs/plugin-react` + `babel-plugin-react-compiler`) — no manual `useMemo` / `useCallback` needed for values the compiler can already memoize.
- **TypeScript** in strict mode.
- **Vite 8** for the dev server (HMR) and the production build.

### Routing
- **React Router v7** (`react-router-dom`) — `<BrowserRouter basename="/learn-app/">` in `src/main.tsx`.

### State management
- **Redux Toolkit** (`@reduxjs/toolkit ^2.12.0`) — store, slices, thunks.
- **react-redux** (`^9.3.0`) — `<Provider>` + `useDispatch` / `useSelector` hooks.

### UI library
- **MUI** — `@mui/material` (Table in `PassedTrainings`) and `@mui/x-date-pickers` (date pickers in `SearchTrainings`, registration, profile editing).
- **Emotion** — `@emotion/react`, `@emotion/styled` — included only because MUI requires them; we do **not** author Emotion-styled components ourselves.

### Date handling
- **dayjs** — lightweight date library paired with `@mui/x-date-pickers`.

### Icons
- **Font Awesome** — `@fortawesome/fontawesome-svg-core`, `@fortawesome/free-brands-svg-icons`, `@fortawesome/react-fontawesome` — used for brand icons (e.g. social links in the Footer).
- **Nucleo outline set** — `nucleo-core-essential-outline-24` — used for general UI icons (lock icon in Change Password, check-circle in success screens, etc.).

### Notifications
- **react-hot-toast** — drives the toaster shown after successful actions and for the `TrainerRoute` redirect error. Wrapped by the project's own `components/common/SuccessToast` for the success variant.

### Linting
- **ESLint 10** with `typescript-eslint`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`.

### Deploy
- **gh-pages** publishes the built `dist/` folder to GitHub Pages.

---

## Backend integration

### Base URL
Defined in `src/services/index.ts`:

```ts
export const BASE_URL = "http://localhost:8080/api/v1";
```

It's currently hardcoded — there's no `.env` plumbing yet. If the backend moves, change it here.

### Auth model
- JWT issued by `POST /auth/login` and stored in `localStorage` under the `token` key.
- Every authenticated service call attaches `Authorization: Bearer ${localStorage.getItem("token")}` to its request headers.
- On every mount, `App.tsx` reads `localStorage.token`, decodes it with `src/helpers/decodeToken.ts`, dispatches `setUserData` to seed `username` + `role` + `token` into Redux, then fires `getUserProfileThunk` to fetch the full profile from the backend. This is what keeps the user logged in after a page refresh.
- Sign-out / change-password clears the token from `localStorage` and dispatches `removeUserData`.

### Services
All services use the native Fetch API — no axios, no shared HTTP wrapper. One file per backend domain:

#### `userService.ts` — auth, registration, password
| Function | Method + path | Notes |
| --- | --- | --- |
| `login` | `POST /auth/login` | Returns `{ token }` |
| `createTrainer` | `POST /trainers` | Returns `{ username, password }` (backend-generated credentials) |
| `createTrainee` | `POST /trainees` | Returns `{ username, password }` |
| `changePassword` | `PUT /auth/users/password` | Authenticated |

#### `trainerService.ts`
| Function | Method + path |
| --- | --- |
| `getTrainerByUsername` | `GET /trainers/{username}` |
| `updateTrainer` | `PUT /trainers/{username}` |
| `deactivateTrainer` | `PATCH /trainers/{username}/state` (sends `{ isActive: false }`) |

#### `traineeService.ts`
| Function | Method + path |
| --- | --- |
| `getTraineeByUsername` | `GET /trainees/{username}` |
| `updateTrainee` | `PUT /trainees/{username}` |
| `deleteTrainee` | `DELETE /trainees/{username}` — service exists but is not yet called from the UI |
| `getTrainees` | `GET /trainees` — returns `TraineeSummary[]`; used by `AddTraining` |

#### `trainingService.ts`
| Function | Method + path |
| --- | --- |
| `getTrainerTrainings` | `GET /trainers/{username}/trainings` (optional `fromDate`, `toDate`, `traineeUsername` query params) |
| `getTraineeTrainings` | `GET /trainees/{username}/trainings` (optional `fromDate`, `toDate`, `trainerUsername`) |
| `createTraining` | `POST /trainings` |

All services throw `new Error(errorBody.message)` on non-2xx responses, parsing the backend's `ApiError` shape (`{ error, message, timestamp, status }`).

---

## Redux store

The store is configured in `src/store/index.ts` and mounted in `src/main.tsx` via `<Provider>`.

### Slices

- **`user`** (`store/slices/userSlice.ts`) — owns auth + profile.
  - State: `username`, `role`, `token`, `isAuth`, `profile`, `loading`, `error`.
  - Sync actions: `setUserData`, `removeUserData`.
- **`trainees`** (`store/slices/traineesSlice.ts`) — caches the global trainee list used by the `AddTraining` form.
  - State: `items: TraineeSummary[]`, `loading`, `error`, `lastFetched` (timestamp; `AddTraining` treats anything older than ~5 min as stale).

### Thunks (`store/thunks/`)

- `getUserProfileThunk({ username, role })` — fetches the appropriate `Trainer` or `Trainee` profile.
- `updateUserThunk(...)` — persists profile edits from `EditProfile`.
- `getAllTraineesThunk()` — populates the `trainees` slice from `getTrainees()`.

### Selectors

All in `store/selectors.ts` — e.g. `getIsAuthSelector`, `getUserRoleSelector`, `getUserNameSelector`, `getDefaultAvatarSelector`, plus profile and trainees-list selectors.

> No typed `useAppDispatch` / `useAppSelector` hooks yet. Components import `AppDispatch` from `src/store` and call `useDispatch<AppDispatch>()`. Adding typed wrappers is on the roadmap.

---

## Folder structure

```
src/
├── App.tsx                 # Route declarations + token rehydration effect
├── main.tsx                # React entry + app-wide providers
├── index.css               # Global styles + CSS custom-property theme tokens
├── assets/                 # Images + Logo.tsx component
├── types/
│   ├── index.ts            # Role, Training, TrainerTraining, TraineeTraining, ApiError
│   └── user.ts             # Trainer, Trainee, *Summary, Update*Payload
├── store/
│   ├── index.ts            # configureStore + RootState / AppDispatch
│   ├── slices/             # userSlice, traineesSlice
│   ├── thunks/             # userThunk, traineeThunk
│   └── selectors.ts
├── services/
│   ├── index.ts            # BASE_URL
│   ├── userService.ts
│   ├── trainerService.ts
│   ├── traineeService.ts
│   └── trainingService.ts
├── routes/
│   ├── PrivateRoute.tsx
│   └── TrainerRoute.tsx
├── helpers/
│   └── decodeToken.ts
├── layout/
│   ├── Header/             # auth-aware; + MobileMenu, DesktopMenu
│   └── Footer/             # + LanguageMenu
├── components/common/      # Reusable primitives:
│   ├── Button/
│   ├── Input/
│   ├── Box/
│   ├── Breadcrumbs/
│   ├── ConfirmModal/
│   └── SuccessToast/
└── pages/
    ├── Home/
    ├── Login/
    ├── Registration/       # + RegistrationSuccess
    ├── JoinUs/             # + JoinUsBox
    ├── StudentAccount/     # + Profile, EditProfile, Trainers, Trainings
    ├── Trainings/          # + SearchTrainings, PassedTrainings
    ├── AddTraining/        # Trainer-only; populated from cached trainees slice
    ├── ChangePassword/     # + ChangePasswordSuccess
    └── NotFound/
```

### Co-location convention
Every component lives in its **own folder** alongside its `.tsx`, its `.module.css`, and an `index.ts` barrel that re-exports it. Page-specific subcomponents live under `pages/<Page>/components/<Subcomponent>/`, so a page's tree is self-contained and easy to move or delete.

---

## Styling approach

The project uses **CSS Modules** for component styling — no Tailwind, no `styled-components`, no Emotion authoring.

- Every component owns a co-located `*.module.css` file.
- Imports use the standard pattern:
  ```tsx
  import styles from './Button.module.css';

  <button className={styles.primary}>Save</button>
  ```
- A **theme layer** lives in `src/index.css` as CSS custom properties (e.g. `--color-primary`, `--font-body`, `--button-radius`). Modules consume those variables instead of hardcoding colors or sizes, which keeps the visual language consistent and makes future theming straightforward.
- The `Button` and `Input` common components expose **variants via props** that toggle CSS-Module classes (e.g. primary vs. secondary, default vs. error). Reuse them rather than restyling raw `<button>` / `<input>` elements.

---

## App-wide providers

Order in `src/main.tsx` (outer → inner):

1. `<StrictMode>`
2. `<BrowserRouter basename="/learn-app/">`
3. `<LocalizationProvider dateAdapter={AdapterDayjs}>` — MUI date pickers
4. `<Provider store={store}>` — Redux
5. `<App />` + `<Toaster position="top-right" />`

Add new app-wide providers in `main.tsx`, not in `App.tsx`.

---

## Conventions & gotchas

- **Strict TypeScript.** `tsconfig.app.json` enables `strict`, `noUnusedLocals`, and `noUnusedParameters`, so unused variables and parameters **fail the build**, not just the lint step. Prefix intentional unused params with `_` (e.g. `_event`).
- **React Compiler is on.** Don't reach for `useMemo` / `useCallback` unless you have measured a real need — the compiler memoizes most cases for you.
- **Reuse Redux selectors.** `store/selectors.ts` already exposes the common ones; don't inline `state => state.user.foo` at call sites.
- **Reuse shared types.** `Role`, `Training`, `Trainer`, `Trainee`, and the summary / payload types live in `src/types/`. Import from there rather than redefining locally.
- **Token = source of truth for session.** Sign-out must clear `localStorage.token` AND dispatch `removeUserData` (see `Header.tsx`); doing only one leaves the app in a half-authenticated state.

---

## Roadmap

- `/registration-verification` page (planned, not built).
- Wire the delete-profile action on `/my-account` to `deleteTrainee` (`DELETE /trainees/{username}` — the service exists).
- Add typed Redux hooks (`useAppDispatch`, `useAppSelector`) and migrate call sites.
- Move `BASE_URL` out of `src/services/index.ts` and into a Vite `.env` variable.
- A test runner and component / integration tests (none configured today).

---

## License

Built as coursework for the **EPAM Frontend React course**. Not intended for production use.
