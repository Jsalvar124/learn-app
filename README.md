# learn-app

A static React learning-platform UI built for the **EPAM Frontend React course (Task 1)**.

🔗 **Live demo:** https://jsalvar124.github.io/learn-app/ — currently lands on the **Student Account** ("My Account") page, since that's the page mounted in `src/App.tsx` while the app is still router-less.

---

## About the project

`learn-app` is the front-end of a learning platform where students and trainers can sign up, log in, and manage their account. The current build is **static** — there is no backend, no real authentication, and no router yet. Page navigation is handled by hand in `src/App.tsx` by commenting / uncommenting the page you want to render.

The next milestone is a refactor to **React Router**, which will replace the manual page switch with real routes and `<Link>` / `<NavLink>` navigation across the Header, Footer, and sign-in flow.

The app currently includes the following flows:

- **Login**
- **Registration** (with a post-submit success screen)
- **Join Us** (role picker — student or trainer)
- **Student Account** (Profile, Edit Profile, Trainers, Trainings)

---

## Getting started

### Prerequisites
- **Node.js** (LTS recommended)
- **npm** (the project uses `package-lock.json`)
- **git**

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
Vite will print a local URL (usually http://localhost:5173/learn-app/) — open it in a browser and you should see the app with HMR enabled.

### Switching the visible page
There is no router yet, so to view a different page open `src/App.tsx` and comment / uncomment the page imports and the JSX inside `<main>`:

```tsx
{/* <Login /> */}
<StudentAccount />
{/* <JoinUs /> */}
```

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

### UI library
- **MUI** — `@mui/material` and `@mui/x-date-pickers` for richer form controls (date pickers in the registration / profile flows).
- **Emotion** — `@emotion/react`, `@emotion/styled` — included only because MUI requires them; we do **not** author Emotion-styled components ourselves.

### Date handling
- **dayjs** — lightweight date library paired with `@mui/x-date-pickers`.

### Icons
- **Font Awesome** — `@fortawesome/fontawesome-svg-core`, `@fortawesome/free-brands-svg-icons`, `@fortawesome/react-fontawesome` — used for brand icons (e.g. social links in the Footer).
- **Nucleo outline set** — `nucleo-core-essential-outline-24` — used for general UI icons.

### Notifications
- **react-hot-toast** — drives the toaster shown after successful actions (e.g. saving the profile). Wrapped by the project's own `components/common/SuccessToast` so call sites stay consistent.

### Linting
- **ESLint 10** with `typescript-eslint`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`.

### Deploy
- **gh-pages** publishes the built `dist/` folder to GitHub Pages.

---

## Folder structure

```
src/
├── App.tsx                 # Page switcher (manual, no router yet)
├── main.tsx                # React entry point
├── index.css               # Global styles + CSS custom-property theme tokens
├── assets/                 # Images + Logo.tsx component
├── types/                  # Shared TS types (e.g. Role = 'student' | 'trainer')
├── layout/
│   ├── Header/             # + components/MobileMenu, components/DesktopMenu
│   └── Footer/             # + components/LanguageMenu
├── components/common/      # Reusable primitives: Button, Input, Box,
│                           # SuccessToast, ConfirmModal
└── pages/
    ├── Login/
    ├── Registration/       # + components/RegistrationSuccess
    ├── JoinUs/             # + components/JoinUsBox
    └── StudentAccount/     # + components/Profile, EditProfile,
                            #   Trainers, Trainings
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

## Additional libraries — where they show up

- **MUI (`@mui/material`, `@mui/x-date-pickers`)** — used wherever a richer control is needed (date pickers in registration and profile editing). Where possible they're wrapped by the project's own common components so the rest of the app stays styled by CSS Modules.
- **Emotion** — present only as MUI's peer dep. Do not write Emotion-styled components.
- **react-hot-toast** — fronted by `components/common/SuccessToast`. Trigger toasts through that wrapper so the look and behavior stay consistent.
- **Font Awesome + Nucleo** — Font Awesome handles brand glyphs (e.g. Footer social links); Nucleo provides the general UI iconography.
- **dayjs** — paired with `@mui/x-date-pickers`; use it for any date math the app needs.

---

## Conventions & gotchas

- **Strict TypeScript.** `tsconfig.app.json` enables `strict`, `noUnusedLocals`, and `noUnusedParameters`, so unused variables and parameters **fail the build**, not just the lint step. Prefix intentional unused params with `_` (e.g. `_event`).
- **React Compiler is on.** Don't reach for `useMemo` / `useCallback` unless you have measured a real need — the compiler memoizes most cases for you.
- **No global state library.** State flows through props. Don't add Context / Redux / Zustand without discussing first.
- **Reuse shared types.** The `Role = 'student' | 'trainer'` union lives in `src/types/index.ts`. Import it across the registration flow rather than redefining the union locally.

---

## Roadmap

### Next milestone — React Router
Replace the hand-rolled page switch in `src/App.tsx` with `<Routes>` + `<Route>`, and turn the Header / Footer / sign-in flow navigation from `useState` toggles into real `<Link>` / `<NavLink>` elements. The current pages already map cleanly to routes:

| Page | Likely route |
| --- | --- |
| Login | `/login` |
| Registration | `/registration` |
| Join Us | `/join-us` |
| Student Account | `/student-account` |

### Later
- Real authentication and a backend integration.
- A test runner and component / integration tests (none configured today).

---

## License

Built as coursework for the **EPAM Frontend React course**. Not intended for production use.
