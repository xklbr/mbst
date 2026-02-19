# MBST App

Smartphone catalog built with Next.js, React, TypeScript, and Styled Components.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Styled Components v6 + CSS custom properties
- **State**: React Context + Reducer (cart)
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint (next/core-web-vitals)
- **Package manager**: pnpm

## Requirements

- Node.js >= 20
- pnpm >= 9

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Create env file from template:
```bash
cp .env.example .env.local
```

3. Set required env values in `.env.local`:
```
API_BASE_URL=https://prueba-tecnica-api-tienda-moviles.onrender.com
API_KEY=your_api_key
```
API docs: `https://prueba-tecnica-api-tienda-moviles.onrender.com/docs/`

4. Run development server:
```bash
pnpm dev
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server (unminified) |
| `pnpm build` | Production build (minified, optimized) |
| `pnpm start` | Run production server |
| `pnpm lint` | ESLint checks |
| `pnpm test` | Run test suite |
| `pnpm test:watch` | Run tests in watch mode |

## Features

- **Catalog** — grid of phones with real-time search filtered by the API, result count indicator
- **Phone detail** — storage/color variant selectors, dynamic price update, image changes by color
- **Cart** — persistent via `localStorage`, remove items, total price, continue shopping
- **Similar products** — horizontal carousel on the detail page
- **SSR** — catalog and detail pages are server-rendered (Next.js App Router)
- **Responsive** — mobile, tablet, and desktop layouts
- **i18n-ready** — all UI strings centralized in `src/shared/i18n/`

## Architecture

Domain-first (screaming architecture):

```
src/
├── app/                        # Route adapters only (thin wrappers)
├── modules/
│   ├── catalog/                # List/search flow
│   ├── phone-detail/           # Detail, variants, similar products
│   └── cart/                   # Cart state, persistence, cart UI
└── shared/
    ├── components/             # Shared UI and layout components
    ├── i18n/                   # Translations (en, es)
    ├── lib/                    # API client, formatters, utilities
    └── styles/                 # Global styles, CSS variables, theme tokens, breakpoints
```

Each module exposes a public API via its `index.ts`. Cross-module imports must go through that barrel — never deep-import from another module's internals.

Path aliases: `@modules/*`, `@shared/*`, `@config/*`.

## Styling

Styling uses Styled Components with a theme token object (`src/shared/styles/theme.ts`). All design tokens are defined as **CSS custom properties** in `:root` (see `global-style.ts`) and referenced via `var(--...)` in the theme — making them overridable at runtime without a rebuild.

```css
/* Defined once in :root */
--color-primary: #000000;
--font-size-sm: 0.75rem;

/* Referenced via theme tokens in styled-components */
color: ${theme.colors.primary};        /* resolves to var(--color-primary) */
font-size: ${theme.fontSize.sm};       /* resolves to var(--font-size-sm) */
```

All spacing, typography, and sizing use `rem` units. Borders and layout max-width constraints use `px`.

## Data Layer

- All API requests go through `src/shared/lib/api/` with `x-api-key` injected from env.
- Endpoints in use:
  - `GET /products` — `search`, `limit`, `offset` params
  - `GET /products/{id}`
- Backend DTOs are mapped to domain models in each module's `lib/` folder.
- Missing or failing API configuration renders an explicit error state (no silent failures).

## State Management

Cart state uses React Context + Reducer (`src/modules/cart/store`). On mount, it hydrates from `localStorage`. Updates are written back to `localStorage` on every change. A hydration guard prevents the persisted cart from being overwritten on initial render.

## i18n

All UI strings live in `src/shared/i18n/locales/`. To switch language, change one import in `src/shared/i18n/index.ts`:

```ts
// English (default)
import { en } from "./locales/en";
export const t = en;

// Spanish
import { es } from "./locales/es";
export const t = es;
```

Both locales are type-checked against the `Locale` type (`src/shared/i18n/types.ts`) — missing or mistyped keys fail at compile time.

## Testing

```bash
pnpm test
```

Coverage:
- **Unit** — cart reducer, cart pricing, catalog mappers, phone-detail mappers
- **Integration** — catalog search interaction, cart page rendering, phone-detail client (variant selection, add-to-cart enablement), full cart flow (add → persist → remove)

20 tests across 8 files.
