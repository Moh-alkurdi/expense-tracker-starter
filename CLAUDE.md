# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

Starter project for the Code with Mosh Claude Code course. Per the README, it **intentionally** has a bug, poor UI, and messy code, all meant to be fixed during the course. Expect to refactor rather than preserve the current structure.

## Commands

```bash
npm install
npm run dev      # Vite dev server at http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve dist/
npm run lint     # ESLint (flat config in eslint.config.js)
```

There is no test runner or test suite configured.

## Architecture

- React 19 + Vite 7, plain JavaScript (JSX), no TypeScript, no router, no state library, no backend.
- `src/main.jsx` mounts `<App />` in `StrictMode`. Global styles are in `src/index.css`, component styles in `src/App.css`.
### Component tree and data flow

```
App (src/App.jsx)                    owns transactions state + module-level categories array
├── Summary (src/Summary.jsx)        props: transactions
├── TransactionForm (src/TransactionForm.jsx)   props: categories, onAdd
└── TransactionList (src/TransactionList.jsx)   props: transactions, categories
```

- One-way data flow: `App` is the single source of truth for `transactions` (seeded with hardcoded sample data, not persisted). Children never mutate it; the only write path is `TransactionForm` → `onAdd(transaction)` → `App.handleAdd`, which appends.
- State is kept local to the component that uses it:
  - `TransactionForm` owns its input state (description, amount, type, category), builds the complete transaction object (`id`, parsed `amount`, `date`), and resets itself after submit.
  - `TransactionList` owns the type/category filter state and derives the filtered rows on render.
  - `Summary` holds no state; it derives income / expenses / balance from **all** transactions, so totals ignore the list filters.
- `categories` is a constant at module scope in `App.jsx` and is passed down to both the form and the list dropdowns. Add new categories there.

### Data model

`{ id, description, amount, type: "income" | "expense", category, date: "YYYY-MM-DD" }`

- `amount` must be a **number** (inputs return strings, so `TransactionForm` uses `parseFloat`). Storing strings breaks the `reduce` sums in `Summary`.
- `id` is `Date.now()` for new entries.

### Conventions

- One component per file in `src/`, function components with a default export, imported with the explicit `.jsx` extension.
- All component styles live in the shared `src/App.css` (class names such as `summary`, `add-transaction`, `transactions`); there is no per-component CSS.

## Known issues

- The "Freelance Work" seed entry has `type: "expense"` with category `salary`, which looks like it should be income.

## Lint notes

`no-unused-vars` ignores names matching `^[A-Z_]`. The `react-hooks` and `react-refresh` (Vite) recommended rules are enabled.
