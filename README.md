# Task Tracker

A modern, full-stack task management application built with Laravel 12, React 19, and TypeScript. Powered by Inertia.js for seamless SPA-style navigation without a dedicated API layer.

---

## Overview

This is a productivity-focused web application for managing tasks and workflows. It combines a robust Laravel backend with a reactive TypeScript/React frontend, all wired together via Inertia.js.

---

## Features

- **Authentication** — Secure registration, login, and session management via Laravel Fortify
- **Task Management** — Create, update, complete, and delete tasks
- **Reactive UI** — Instant feedback with React 19 and optimistic updates
- **Type-safe Routing** — Laravel Wayfinder generates typed route helpers for use in TypeScript
- **Accessible Components** — Built on Radix UI primitives for keyboard navigation and screen reader support
- **SSR Support** — Optional server-side rendering via Inertia SSR
- **Code Quality** — ESLint, Prettier, Pint, and TypeScript strict mode enforced across the stack

---

## Tech Stack

### Backend
| Package | Version | Purpose |
-------------------------------
| PHP | ^8.2 | Runtime |
| Laravel | ^12.0 | Application framework |
| Inertia.js (Laravel) | ^2.0 | Server-side adapter for Inertia |
| Laravel Fortify | ^1.30 | Authentication backend |
| Laravel Wayfinder | ^0.1.9 | Type-safe route generation |
| Laravel Sail | ^1.41 | Docker development environment |

### Frontend
| Package | Version | Purpose |
-------------------------------
| React | ^19.2.0 | UI framework |
| TypeScript | ^5.7.2 | Type safety |
| Inertia.js (React) | ^2.3.7 | Client-side SPA adapter |
| Tailwind CSS | ^4.0.0 | Utility-first styling |
| Radix UI | various | Accessible component primitives |
| Vite | ^7.0.4 | Build tool and dev server |
| Lucide React | ^0.475.0 | Icon library |

### Tooling
| Tool | Purpose |
------------------
| Laravel Pint | PHP code style (PSR-12) |
| ESLint | JavaScript/TypeScript linting |
| Prettier | Frontend code formatting |
| PHPUnit | Backend testing |
| Concurrently | Parallel dev process runner |

---

## Requirements

- PHP 8.2+
- Composer 2.x
- Node.js 20+ and npm 10+
- SQLite (default) or MySQL/PostgreSQL

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/nnnnnoah/TaskTracker.git
cd task-tracker
```

### 2. One-command setup

```bash
composer run setup
```

This will:
1. Install PHP dependencies via Composer
2. Copy `.env.example` → `.env` (if not already present)
3. Generate the application key
4. Run database migrations
5. Install Node dependencies
6. Build frontend assets

---

## Environment Setup

Copy the example environment file if you haven't already:

```bash
cp .env.example .env
php artisan key:generate
```

Key variables to configure in `.env`:

```env
APP_NAME="Task Tracker"
APP_ENV=local
APP_URL=http://localhost:8000

# Database (SQLite by default — no extra setup needed)
DB_CONNECTION=sqlite
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=task_tracker
# DB_USERNAME=root
# DB_PASSWORD=

# Queue (sync for local dev, database/redis for production)
QUEUE_CONNECTION=sync
```

### Database setup

```bash
# Run migrations
php artisan migrate

# Optionally seed with sample data
php artisan db:seed
```

---

## Running Locally

### Standard dev server

Start the Laravel server, queue worker, and Vite dev server in parallel:

```bash
composer run dev
```

This launches three processes simultaneously:
- `php artisan serve` — Laravel on `http://localhost:8000`
- `php artisan queue:listen` — Background job processor
- `npm run dev` — Vite HMR dev server

### SSR dev server

To run with server-side rendering enabled:

```bash
composer run dev:ssr
```

This builds SSR assets first, then starts Laravel, the queue worker, Pail log viewer, and the Inertia SSR Node process.

---

## Build Commands

| Command | Description |
-------------------------
| `npm run build` | Production build (client-side) |
| `npm run build:ssr` | Production build with SSR bundle |
| `npm run dev` | Vite dev server with HMR |

---

## Code Quality

### Linting & formatting

```bash
# PHP — fix style issues
composer run lint

# PHP — check only (no changes)
composer run lint:check

# JS/TS — fix linting issues
npm run lint

# JS/TS — check only
npm run lint:check

# Prettier — format frontend files
npm run format

# Prettier — check only
npm run format:check

# TypeScript — type check without emitting
npm run types:check
```

### Testing

```bash
# Run the full PHP test suite
composer run test

# Run all CI checks (lint, format, types, tests)
composer run ci:check
```

---

## Folder Structure

```
task-tracker/
├── app/
│   ├── Http/
│   │   ├── Controllers/       # Request handlers
│   │   └── Middleware/        # HTTP middleware
│   ├── Models/                # Eloquent models
│   └── Actions/               # Single-responsibility action classes
├── database/
│   ├── migrations/            # Database schema migrations
│   ├── factories/             # Model factories for testing/seeding
│   └── seeders/               # Database seeders
├── resources/
│   ├── js/
│   │   ├── components/        # Reusable React components
│   │   ├── layouts/           # Page layout wrappers
│   │   ├── pages/             # Inertia page components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utility functions
│   │   └── types/             # TypeScript type definitions
│   └── css/                   # Global styles and Tailwind config
├── routes/
│   ├── web.php                # Web routes
│   └── auth.php               # Authentication routes
├── tests/
│   ├── Feature/               # Feature/integration tests
│   └── Unit/                  # Unit tests
├── bootstrap/
├── config/
├── public/
├── composer.json
├── package.json
├── tsconfig.json
├── vite.config.ts
└── .env.example
```

---

## Future Improvements

- [ ] **Task priorities & due dates** — Priority levels (low/medium/high) and deadline tracking with overdue indicators
- [ ] **Projects / workspaces** — Group tasks into projects with separate boards and membership
- [ ] **Drag-and-drop reordering** — Kanban-style board view with draggable task cards
- [ ] **Labels & filtering** — Tag tasks with custom labels and filter/search across the board
- [ ] **Activity log** — Audit trail of changes per task (created, updated, completed, reassigned)
- [ ] **Notifications** — In-app and email notifications for assignments and due date reminders
- [ ] **Dark mode** — System-preference-aware theme toggle
- [ ] **REST API** — Expose a JSON API for mobile client or third-party integrations
- [ ] **End-to-end tests** — Playwright or Cypress test suite covering critical user flows
- [ ] **CI/CD pipeline** — GitHub Actions workflow running `composer ci:check` on pull requests

---

## License

This project is open-sourced under the [MIT license](LICENSE).