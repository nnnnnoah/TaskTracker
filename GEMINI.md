# GEMINI.md

This file gives Gemini project context for **Task Tracker** so it doesn't have to re-derive the stack and conventions every session.

## Project Overview

A task management app built with Laravel 12 + Inertia.js + React 19 + TypeScript. No separate REST API — Inertia handles server-driven SPA navigation directly from Laravel controllers to React page components.

Repo: `nnnnnoah/TaskTracker`

## Stack

**Backend**
- PHP ^8.2, Laravel ^12.0
- `inertiajs/inertia-laravel` ^2.0
- `laravel/fortify` ^1.30 — auth backend (login/register/2FA), no bundled UI
- `laravel/wayfinder` ^0.1.9 — generates typed TS route/action helpers into `resources/js/actions` and `resources/js/routes`
- `tightenco/ziggy` — also present (`resources/js/ziggy.js`, `ziggy-js` dep). **Wayfinder is the primary route-typing tool; treat Ziggy as legacy/secondary unless told otherwise.**
- `laravel/boost` (dev) — Laravel's own AI-assistant tooling is installed in this project. Don't fight it or duplicate what it already provides.
- Testing: PHPUnit ^11.5 (not Pest). `tests/Feature`, `tests/Unit`.

**Frontend**
- React ^19.2, TypeScript ^5.7
- `@inertiajs/react` ^2.3.7
- Tailwind CSS ^4.0 (CSS-based config, no `tailwind.config.js` — v4 style)
- Radix UI primitives + `lucide-react` icons
- Vite ^7.0.4, with `laravel-vite-plugin` and `@laravel/vite-plugin-wayfinder`
- SSR available via `resources/js/ssr.tsx` and `composer dev:ssr`

## Commands

```bash
composer run setup       # first-time install: deps, .env, key, migrate, npm install, build
composer run dev         # serve + queue:listen + vite, concurrently
composer run dev:ssr     # SSR build + serve + queue + pail logs + inertia SSR

composer run lint        # Pint, fix
composer run lint:check  # Pint, check only
npm run lint             # ESLint, fix
npm run lint:check       # ESLint, check only
npm run format            # Prettier, fix
npm run format:check      # Prettier, check only
npm run types:check       # tsc --noEmit

composer run test        # config:clear + lint:check + artisan test
composer run ci:check    # lint:check + format:check + types:check + test
```

## Directory Structure

```
app/
  Actions/Fortify/          # Fortify action classes (registration, password reset, etc.)
  Concerns/
  Http/Controllers/         # AuthController, Settings/* controllers
  Http/Requests/            # Form Requests — currently only under Settings/
  Http/Middleware/
  Models/                   # List, Tag, Task, TaskTag, User
routes/
  web.php                   # main routes
  settings.php              # settings routes, required from web.php
  console.php
resources/js/
  actions/                  # Wayfinder-generated typed controller actions
  routes/                   # Wayfinder-generated typed route helpers
  pages/                    # Inertia page components (Home, Lists, Tasks, Login, Register, Welcome)
  components/
    forms/                  # e.g. LoginForm.tsx
    ui/                     # e.g. HomeActions.tsx, WelcomeMessage.tsx
  layouts/                  # AppLayout.tsx, auth/, settings/
  hooks/
  lib/utils.ts
  types/                    # auth.ts, ui.ts, navigation.ts, index.ts
tests/
  Feature/, Feature/Auth/, Feature/Settings/, Unit/
```

## Conventions

- **Routing**: `Route::inertia(...)` is used for pages with no controller logic (e.g. `/lists`, `/tasks`, `/login` GET). Controllers are only introduced when there's actual server logic (form submission, mutation). Follow this pattern rather than adding controllers for simple page renders.
- **Form Requests**: only exist under `app/Http/Requests/Settings/` so far. Follow that pattern (a `Requests/<Feature>/` subfolder) when adding validation for new features rather than validating inline.
- **Routes in JS**: use Wayfinder-generated helpers from `resources/js/actions` / `resources/js/routes`, not hardcoded URL strings. Ziggy is present but secondary.
- **PHP style**: Laravel Pint (PSR-12), enforced via `composer run lint:check`. Don't hand-format against it.
- **JS/TS style**: ESLint + Prettier + `prettier-plugin-tailwindcss` (class sorting). Run `npm run lint:check` and `npm run format:check` before considering frontend work done.
- **Type safety**: `tsc --noEmit` is a required CI check — don't introduce `any` casually.

## Known In-Progress / Inconsistent State

Flag these rather than "fixing" silently — they may be intentional works-in-progress:

- `routes/web.php` defines singular `/list` and `/task` routes pointing at Inertia components `List` and `Task`, but only `Lists.tsx` and `Tasks.tsx` exist in `resources/js/pages` — the singular page components don't exist yet.
- Models exist for `List`, `Task`, `Tag`, `TaskTag`, but there are no corresponding controllers yet — all task/list routes currently just render static Inertia pages with no data wiring.
- `.env.example` sets `DB_CONNECTION=pgsql`, but the README describes SQLite as the default. Confirm which is actually intended before assuming a DB driver.

## What I want from Gemini here

- Match existing patterns above rather than introducing new ones (e.g. new state libraries, new validation styles, new routing patterns) without asking.
- When adding a feature that touches List/Task/Tag, note that this is genuinely new ground (no controllers precedent yet) — propose the pattern rather than assuming one.
- Prefer Wayfinder-typed routes over Ziggy or raw strings in new code.