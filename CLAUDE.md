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
- Everything lives in one component, `src/App.jsx`: transaction state (seeded with hardcoded sample data, not persisted), add-transaction form state, type/category filters, derived totals (income / expenses / balance), and all the markup. The category list is a hardcoded array in the same file and feeds both the form and the filter dropdowns.
- Transaction shape: `{ id, description, amount, type: "income" | "expense", category, date: "YYYY-MM-DD" }`. `id` is `Date.now()` for new entries.

## Known issues

- The "Freelance Work" seed entry has `type: "expense"` with category `salary`, which looks like it should be income.

## Lint notes

`no-unused-vars` ignores names matching `^[A-Z_]`. The `react-hooks` and `react-refresh` (Vite) recommended rules are enabled.
